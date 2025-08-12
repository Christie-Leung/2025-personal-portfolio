/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { MessageBlocks } from './MessageBlocks';

interface IStreamEvent {
  isSystem: boolean;
  data: MessageBlocks;
}


export class StreamEvent implements IStreamEvent {
  declare isSystem: boolean;

  declare data: MessageBlocks;


  public static builder = () => {
  return StrictBuilder<IStreamEvent>();
    }
  }

