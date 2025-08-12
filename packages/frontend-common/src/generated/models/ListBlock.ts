/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;list&#x27; } from './&#x27;list&#x27;';

interface IListBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'list';

  ordered: boolean;
  items: string[];
}


export class ListBlock implements IListBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'list';

  declare ordered: boolean;

  /**
   * @description <p>One item per bullet/numbered entry</p>
   * @type {string[]}
   * @memberof ListBlock
   */
  declare items: string[];


  public static builder = () => {
  return StrictBuilder<IListBlock>();
    }
  }

