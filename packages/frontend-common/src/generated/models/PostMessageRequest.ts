/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';




interface IPostMessageRequest {
  content: string;
}


export class PostMessageRequest implements IPostMessageRequest {
  declare content: string;


  public static builder = () => {
  return StrictBuilder<IPostMessageRequest>();
    }
  }

