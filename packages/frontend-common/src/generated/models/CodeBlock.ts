/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;code&#x27; } from './&#x27;code&#x27;';

interface ICodeBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'code';

  language?: string;
  content: string;
}


export class CodeBlock implements ICodeBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'code';

  declare language?: string;

  declare content: string;


  public static builder = () => {
  return StrictBuilder<ICodeBlock>();
    }
  }

