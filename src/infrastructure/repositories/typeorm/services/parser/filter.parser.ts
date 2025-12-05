import { Injectable } from '@nestjs/common';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import {
  Between,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

/**
 * FilterParser é responsável por converter filtros dinâmicos
 * vindos da query string para a sintaxe do TypeORM.
 *
 * Operadores suportados:
 * - eq: igualdade
 * - ne: não igual (Not())
 * - gt: maior que (MoreThan())
 * - ge: maior ou igual (MoreThanOrEqual())
 * - lt: menor que (LessThan())
 * - le: menor ou igual (LessThanOrEqual())
 * - like: busca por padrão (Like())
 * - in: dentro de um array (In())
 * - between: entre dois valores (Between())
 */
@Injectable()
export class FilterParser {
  /**
   * Mapeia operadores da string para instâncias do TypeORM
   * @param operator - Nome do operador (eq, ne, gt, etc)
   * @param value - Valor a ser aplicado
   * @returns Instância do operador TypeORM ou valor simples
   */
  private mapOperator(operator: string, value: any): any {
    switch (operator.toLowerCase()) {
      case 'eq':
        return value;

      case 'ne':
        return Not(value);

      case 'gt':
        return MoreThan(value);

      case 'ge':
        return MoreThanOrEqual(value);

      case 'lt':
        return LessThan(value);

      case 'le':
        return LessThanOrEqual(value);

      case 'like':
        return Like(`%${value}%`);

      case 'in':
        if (!Array.isArray(value)) {
          throw new NotFoundDomainException(
            `Operator 'in' expects an array value. Received: ${typeof value}`,
          );
        }
        return In(value);

      case 'between':
        if (!Array.isArray(value) || value.length !== 2) {
          throw new NotFoundDomainException(
            `Operator 'between' expects an array with exactly 2 values. Received: ${JSON.stringify(value)}`,
          );
        }
        return Between(value[0], value[1]);

      default:
        throw new NotFoundDomainException(
          `Invalid operator: ${operator}. Allowed operators: eq, ne, gt, ge, lt, le, like, in, between`,
        );
    }
  }

  /**
   * Converte um objeto de filtros em um objeto where do TypeORM
   *
   * Exemplo de entrada:
   * {
   *   fantasy_name: { eq: "Company" },
   *   number: { gt: 100 }
   * }
   *
   * Exemplo de saída:
   * {
   *   fantasy_name: "Company",
   *   number: MoreThan(100)
   * }
   *
   * @param filters - Objeto com filtros dinâmicos
   * @returns Objeto where formatado para TypeORM
   */
  parseFilters(
    filters: Record<string, Record<string, any>>,
  ): Record<string, any> {
    if (!filters) return {};

    const where: Record<string, any> = {};

    for (const [fieldName, conditions] of Object.entries(filters)) {
      if (!conditions || typeof conditions !== 'object') {
        continue;
      }

      for (const [operator, value] of Object.entries(conditions)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const mappedValue = this.mapOperator(operator, value);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        where[fieldName] = mappedValue;
      }
    }

    return where;
  }
}
