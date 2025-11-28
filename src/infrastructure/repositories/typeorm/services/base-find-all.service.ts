import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';

@Injectable()
export class BaseFindAllService<T extends ObjectLiteral> {
  async findAllBase(
    repository: Repository<T>,
    alias: string,
    params: QueryParams,
  ): Promise<ResponseList<T>> {
    const query: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);
    const metadata = repository.metadata;
    const verifyColumns = metadata.columns.map((column) => column.propertyName);

    const { select, orderBy, page, limit, sortBy } = params;

    const options = {
      select: select ? select.split(',') : undefined,
      orderBy: orderBy || 'asc',
      page: Number(page) || 0,
      limit: limit ? Number(limit) : 10,
      sortBy: sortBy || 'createdAt',
    };

    if (options.select) {
      options.select.forEach((field) => {
        if (!verifyColumns.includes(field)) {
          throw new NotFoundDomainException(`Invalid field: ${field}`);
        }
      });
      const columns = options.select.map((field) => `${alias}.${field}`);
      query.select(columns);
    }

    if (options.sortBy) {
      query.orderBy(
        `${alias}.${options.sortBy}`,
        options.orderBy.toUpperCase() as 'ASC' | 'DESC',
      );
    }

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
