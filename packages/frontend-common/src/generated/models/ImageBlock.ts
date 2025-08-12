/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;image&#x27; } from './&#x27;image&#x27;';

interface IImageBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'image';

  url: string;
  alt?: string;
}


export class ImageBlock implements IImageBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'image';

  declare url: string;

  declare alt?: string;


  public static builder = () => {
  return StrictBuilder<IImageBlock>();
    }
  }

