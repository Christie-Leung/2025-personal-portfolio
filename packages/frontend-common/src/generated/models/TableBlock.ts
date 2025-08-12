/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;table&#x27; } from './&#x27;table&#x27;';

interface ITableBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'table';

  headers: string[];
  rows: (string[])[];
}


export class TableBlock implements ITableBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'table';

  declare headers: string[];

  declare rows: (string[])[];


  public static builder = () => {
  return StrictBuilder<ITableBlock>();
    }
  }

