import { Injectable } from '@nestjs/common';
import { QueryParamsGetOne } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { RelationsParser } from './parser/relations.parser';

@Injectable()
export class BaseFindOneService<T extends ObjectLiteral> {
  constructor(private readonly relationsParser: RelationsParser) {}

  async findOneById(
    repository: Repository<T>,
    alias: string,
    id: string | number,
    params?: QueryParamsGetOne,
  ): Promise<T | null> {
    const query: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);
    const metadata = repository.metadata;
    const verifyColumns = metadata.columns.map((column) => column.propertyName);

    const { select, relations } = params ?? {};

    const options = {
      select: select ? select.split(',') : undefined,
      relations: relations ?? '',
    };

    // Aplicar seleção de colunas
    if (options.select) {
      options.select.forEach((field) => {
        if (!verifyColumns.includes(field)) {
          throw new NotFoundDomainException(`Invalid field: ${field}`);
        }
      });
      const columns = options.select.map((field) => `${alias}.${field}`);
      query.select(columns);
    }

    // Aplicar relacionamentos
    const parsedRelations = this.relationsParser.parseRelations(
      options.relations,
    );
    if (Object.keys(parsedRelations).length > 0) {
      for (const relation of Object.keys(parsedRelations)) {
        query.leftJoinAndSelect(`${alias}.${relation}`, relation);
      }
    }

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
}
