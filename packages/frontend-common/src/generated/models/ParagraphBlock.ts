/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;paragraph&#x27; } from './&#x27;paragraph&#x27;';

interface IParagraphBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'paragraph';

  text: string;
}


export class ParagraphBlock implements IParagraphBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'paragraph';

  declare text: string;


  public static builder = () => {
  return StrictBuilder<IParagraphBlock>();
    }
  }

