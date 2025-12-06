import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterParser } from './parser/filter.parser';
import { RelationsParser } from './parser/relations.parser';

@Injectable()
export class BaseFindAllService<T extends ObjectLiteral> {
  constructor(
    private readonly filterParser: FilterParser,
    private readonly relationsParser: RelationsParser,
  ) {}

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
    if (options.relations) {
      options.relations.map((relation) => {
        if (!validRelations.includes(relation)) {
          throw new NotFoundDomainException(`Invalid relation: ${relation}`);
        }
        query.leftJoin(`${alias}.${relation}`, relation);
      });
    }

    // Aplicar seleção de colunas
    if (options.select) {
      const selectFields: string[] = [];

      options.select.map((field: string) => {
        if (field.includes('.')) {
          const [relation, column] = field.split('.');

          if (!options.relations || !options.relations.includes(relation)) {
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

    // Aplicar filtros dinâmicos
    const whereConditions = this.filterParser.parseFilters(options.filter);
    if (Object.keys(whereConditions).length > 0) {
      query.where(whereConditions);
    }

    // Aplicar ordenação
    if (options.sortBy) {
      query.orderBy(
        `${alias}.${options.sortBy}`,
        options.orderBy.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    // Aplicar paginação
    if (options.page !== undefined && options.limit !== undefined) {
      const skip = options.page * options.limit;
      query.skip(skip).take(options.limit);
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      metadata: {
        total,
      },
    };
  }
}
