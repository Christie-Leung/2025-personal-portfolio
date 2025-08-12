import { CreateDateColumn, ObjectLiteral, UpdateDateColumn } from 'typeorm';
import { Required } from '@tsed/schema';

export class DateableEntity implements ObjectLiteral {
  @CreateDateColumn()
  @Required()
  dateCreated: Date;

  @UpdateDateColumn()
  @Required()
  dateUpdated: Date;
}
