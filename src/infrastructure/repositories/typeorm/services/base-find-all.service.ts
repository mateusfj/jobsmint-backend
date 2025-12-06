import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import {
  EntityMetadata,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { FilterParser } from './parser/filter.parser';

@Injectable()
export class BaseFindAllService<T extends ObjectLiteral> {
  constructor(private readonly filterParser: FilterParser) {}

  async findAllBase(
    repository: Repository<T>,
    alias: string,
    params: QueryParams,
  ): Promise<ResponseList<T>> {
    const query: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);
    const metadata = repository.metadata;
    const validRelations = metadata.relations.map(
      (relation) => relation.propertyName,
    );
    const validColumns = metadata.columns.map((column) => column.propertyName);

    const { select, orderBy, page, limit, sortBy, filter, relations } = params;
    const options = {
      relations: relations ? relations.split(',') : undefined,
      select: select ? select.split(',') : undefined,
      orderBy: orderBy || 'asc',
      page: Number(page) || 0,
      limit: limit ? Number(limit) : 10,
      sortBy: sortBy ?? '',
      filter: filter || {},
    };

    //Aplicar relacionamentos
    this.applyRelations(options.relations, validRelations, query, alias);

    // Aplicar seleção de colunas
    this.applySelectFields(
      options.relations,
      options.select,
      validRelations,
      metadata,
      validColumns,
      alias,
      query,
    );

    // Aplicar filtros dinâmicos
    const whereConditions = this.filterParser.parseFilters(options.filter);
    if (Object.keys(whereConditions).length > 0) {
      query.where(whereConditions);
    }

    // Aplicar ordenação
    this.applySorting(options.sortBy, options.orderBy, query, alias);

    // Aplicar paginação
    this.applyPagination(options.page, options.limit, query);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      metadata: {
        total,
      },
    };
  }

  private applyPagination(
    page: number,
    limit: number,
    query: SelectQueryBuilder<T>,
  ) {
    if (page !== undefined && limit !== undefined) {
      const skip = page * limit;
      query.skip(skip).take(limit);
    }
  }

  private applySorting(
    sortBy: string,
    orderBy: 'asc' | 'desc',
    query: SelectQueryBuilder<T>,
    alias: string,
  ) {
    if (sortBy) {
      query.orderBy(
        `${alias}.${sortBy}`,
        orderBy.toUpperCase() as 'ASC' | 'DESC',
      );
    }
  }

  private applySelectFields(
    relations: string[] | undefined,
    select: string[] | undefined,
    validRelations: string[],
    metadata: EntityMetadata,
    validColumns: string[],
    alias: string,
    query: SelectQueryBuilder<T>,
  ) {
    if (select) {
      const selectFields: string[] = [];

      select.map((field: string) => {
        if (field.includes('.')) {
          const [relation, column] = field.split('.');

          if (!relations || !relations.includes(relation)) {
            throw new BadRequestException(
              `A relação '${relation}' não foi incluída nas relações da consulta`,
            );
          }

          if (!validRelations.includes(relation)) {
            throw new BadRequestException(
              `A relação '${relation}' não existe na entidade '${metadata.name}'`,
            );
          }

          const relationMetadata =
            metadata.findRelationWithPropertyPath(relation);

          if (!relationMetadata) {
            throw new BadRequestException(
              `Relação '${relation}' não encontrada`,
            );
          }

          const relationColumns =
            relationMetadata.inverseEntityMetadata.columns.map(
              (col) => col.propertyName,
            );

          if (!relationColumns.includes(column)) {
            throw new BadRequestException(
              `A coluna '${column}' não existe na relação '${relation}'`,
            );
          }

          // Adiciona apenas a coluna desejada da relação
          selectFields.push(`${relation}.${column}`);
        } else {
          if (!validColumns.includes(field)) {
            throw new BadRequestException(
              `O campo '${field}' não existe na entidade '${metadata.name}'`,
            );
          }
          selectFields.push(`${alias}.${field}`);
        }
      });

      // Aplica todos os selects construídos
      query.select(selectFields);
    }
  }

  private applyRelations(
    relations: string[] | undefined,
    validRelations: string[],
    query: SelectQueryBuilder<T>,
    alias: string,
  ) {
    if (relations) {
      relations.map((relation) => {
        if (!validRelations.includes(relation)) {
          throw new NotFoundDomainException(`Invalid relation: ${relation}`);
        }
        query.leftJoinAndSelect(`${alias}.${relation}`, relation);
      });
    }
  }
}
