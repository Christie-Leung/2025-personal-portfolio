/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';




interface IPostMessage200Response {
  ok?: boolean;
  messageId?: string;
}


export class PostMessage200Response implements IPostMessage200Response {
  declare ok?: boolean;

  /**
   * @description <p>The ID of the message posted in Discord</p>
   * @type {string}
   * @memberof PostMessage200Response
   */
  declare messageId?: string;


  public static builder = () => {
  return StrictBuilder<IPostMessage200Response>();
    }
  }

