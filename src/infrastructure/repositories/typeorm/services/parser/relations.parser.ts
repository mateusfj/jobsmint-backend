import { Injectable } from '@nestjs/common';

/**
 * RelationsParser é responsável por converter uma string de
 * relacionamentos em um objeto com a sintaxe correta do TypeORM.
 *
 * Exemplo de entrada:
 * "company,profile,address"
 *
 * Exemplo de saída:
 * {
 *   company: true,
 *   profile: true,
 *   address: true
 * }
 */
@Injectable()
export class RelationsParser {
  /**
   * Converte uma string de relacionamentos separada por vírgula
   * em um objeto onde cada relacionamento é uma chave com valor true.
   *
   * Se a entrada for undefined, null ou string vazia, retorna um objeto vazio.
   *
   * @param relations - String com relacionamentos separados por vírgula (ex: "company,profile")
   * @returns Objeto com relacionamentos formatado para TypeORM (ex: { company: true, profile: true })
   */
  parseRelations(relations?: string | null): Record<string, boolean> {
    if (!relations) return {};

    const relationsArray = relations
      .split(',')
      .map((relation) => relation.trim())
      .filter((relation) => relation.length > 0);

    const result: Record<string, boolean> = {};

    relationsArray.map((relation) => {
      result[relation] = true;
    });

    return result;
  }
}
