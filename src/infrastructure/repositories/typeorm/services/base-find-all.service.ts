import { Injectable } from '@nestjs/common';
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
    const verifyColumns = metadata.columns.map((column) => column.propertyName);

    const { select, orderBy, page, limit, sortBy, filter, relations } = params;

    const options = {
      select: select ? select.split(',') : undefined,
      orderBy: orderBy || 'asc',
      page: Number(page) || 0,
      limit: limit ? Number(limit) : 10,
      sortBy: sortBy || 'created_at',
      filter: filter || {},
      relations: relations || '',
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

    // Aplicar filtros dinâmicos
    const whereConditions = this.filterParser.parseFilters(options.filter);
    if (Object.keys(whereConditions).length > 0) {
      query.where(whereConditions);
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
