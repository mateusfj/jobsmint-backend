import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { QueryParamsGetOne } from 'src/core/shared/interfaces/query-params/query-params.interface';

@Injectable()
export class BaseFindOneService<T extends ObjectLiteral> {
  async findOneById(
    repository: Repository<T>,
    alias: string,
    id: string | number,
    params?: QueryParamsGetOne,
  ): Promise<T | null> {
    const query: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);
    const metadata = repository.metadata;
    const verifyColumns = metadata.columns.map((column) => column.propertyName);

    const { select } = params ?? {};

    const options = {
      select: select ? select.split(',') : undefined,
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
