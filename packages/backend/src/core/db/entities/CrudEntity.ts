import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { Property, Required } from '@tsed/schema';
import { IdProperty } from '~/core/db/decorators/IdProperty';
import { DateableEntity } from '~/core/db/entities/DateableEntity';
import { AutoIdEntity } from '~/core/db/entities/AutoIdEntity';
import { IdEntity } from './IdEntity';
import { IdColumn } from '~/core/db/decorators/IdColumn';

export class CrudEntity<I extends Id>
  implements DateableEntity, AutoIdEntity, IdEntity<I>
{
  @Property()
  @PrimaryGeneratedColumn()
  autoId: number;

  @IdColumn({ unique: true })
  @IdProperty()
  @Required()
  id: I;

  @CreateDateColumn()
  @Required()
  dateCreated: Date;

  @UpdateDateColumn()
  @Required()
  dateUpdated: Date;
}
