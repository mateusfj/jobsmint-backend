import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryParamsGetOne } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import {
  EntityMetadata,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

@Injectable()
export class BaseFindOneService<T extends ObjectLiteral> {
  async findOneById(
    repository: Repository<T>,
    alias: string,
    id: string | number,
    params: QueryParamsGetOne,
  ): Promise<T | null> {
    const query: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);
    const metadata = repository.metadata;
    const validColumns = metadata.columns.map((column) => column.propertyName);
    const validRelations = metadata.relations.map(
      (relation) => relation.propertyName,
    );

    const { select, relations } = params;

    const options = {
      select: select ? select.split(',') : undefined,
      relations: relations ? relations.split(',') : undefined,
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

    const primaryColumn = metadata.primaryColumns[0]?.propertyName;

    if (!primaryColumn) {
      throw new Error(
        `Entity ${metadata.name} does not have a primary column.`,
      );
    }

    query.where(`${alias}.${primaryColumn} = :id`, { id });

    const data = await query.getOne();

    return data;
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
