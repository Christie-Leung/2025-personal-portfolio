/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;heading&#x27; } from './&#x27;heading&#x27;';

interface IHeadingBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'heading';

  level: number;
  text: string;
}


export class HeadingBlock implements IHeadingBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'heading';

  /**
   * @type {number}
   * @memberof HeadingBlock
   * minimum: 1
   * maximum: 6
   */
  declare level: number;

  declare text: string;


  public static builder = () => {
  return StrictBuilder<IHeadingBlock>();
    }
  }

