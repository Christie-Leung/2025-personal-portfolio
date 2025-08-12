/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { ChatId } from '@2025-personal-portfolio/common/src/ids/ChatId';

interface ICreateChatResponse {
  chatId: ChatId;
  threadId: string;
}


export class CreateChatResponse implements ICreateChatResponse {
  /**
   * @description <p>The unique identifier for the chat</p>
   * @type {ChatId}
   * @memberof CreateChatResponse
   */
  declare chatId: ChatId;

  /**
   * @description <p>Discord thread id created for this chat</p>
   * @type {string}
   * @memberof CreateChatResponse
   */
  declare threadId: string;


  public static builder = () => {
  return StrictBuilder<ICreateChatResponse>();
    }
  }

