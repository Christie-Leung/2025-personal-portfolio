/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { &#x27;divider&#x27; } from './&#x27;divider&#x27;';

interface IDividerBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  type: 'divider';

}


export class DividerBlock implements IDividerBlock {
	/**
	 * Value for discriminator in MessageBlock
	 */
  
  declare type: 'divider';


  public static builder = () => {
  return StrictBuilder<IDividerBlock>();
    }
  }

