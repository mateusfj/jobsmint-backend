import { BaseFindAllService } from './base-find-all.service';
import { BaseFindOneService } from './base-find-one.service';
import { FilterParser } from './parser/filter.parser';
import { RelationsParser } from './parser/relations.parser';

export const TYPEORM_SERVICES_PROVIDERS = [
  FilterParser,
  RelationsParser,
  BaseFindAllService,
  BaseFindOneService,
];
