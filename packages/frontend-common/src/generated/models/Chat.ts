/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { ChatId } from '@2025-personal-portfolio/common/src/ids/ChatId';
import { ChatMessage } from './ChatMessage';

interface IChat {
  id: ChatId;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}


export class Chat implements IChat {
  /**
   * @description <p>The unique identifier for the chat</p>
   * @type {ChatId}
   * @memberof Chat
   */
  declare id: ChatId;

  /**
   * @description <p>The title of the conversation</p>
   * @type {string}
   * @memberof Chat
   */
  declare title: string;

  /**
   * @description <p>The messages in the conversation</p>
   * @type {ChatMessage[]}
   * @memberof Chat
   */
  declare messages: ChatMessage[];

  /**
   * @description <p>The date and time when the conversation was created</p>
   * @type {string}
   * @memberof Chat
   */
  declare createdAt: Date;

  /**
   * @description <p>The date and time when the conversation was last updated</p>
   * @type {string}
   * @memberof Chat
   */
  declare updatedAt: Date;


  public static builder = () => {
  return StrictBuilder<IChat>();
    }
  }

