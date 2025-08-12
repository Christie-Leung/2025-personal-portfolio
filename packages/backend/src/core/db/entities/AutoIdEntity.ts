import { ObjectLiteral, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '@tsed/schema';
import { Exclude } from 'class-transformer';

export class AutoIdEntity implements ObjectLiteral {
  @Property()
  @PrimaryGeneratedColumn()
  @Exclude()
  autoId: number;
}
