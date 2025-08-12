import { ObjectLiteral } from 'typeorm';
import { Required } from '@tsed/schema';
import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { PrimaryIdColumn } from '~/core/db/decorators/PrimaryIdColumn';
import { IdProperty } from '~/core/db/decorators/IdProperty';

export class IdEntity<I extends Id> implements ObjectLiteral {
  @PrimaryIdColumn()
  @IdProperty()
  @Required()
  id: I;
}
