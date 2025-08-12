/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { ChatMessageId } from '@2025-personal-portfolio/common/src/ids/ChatMessageId';
import { ChatId } from '@2025-personal-portfolio/common/src/ids/ChatId';
import { MessageRole } from './MessageRole';
import { MessageBlocks } from './MessageBlocks';

interface IChatMessage {
  id: ChatMessageId;
  chatId: ChatId;
  role: MessageRole;
  content: MessageBlocks;
  messageIndex: number;
  createdAt: Date;
  updatedAt: Date;
}


export class ChatMessage implements IChatMessage {
  /**
   * @description <p>The unique identifier for the chat message</p>
   * @type {ChatMessageId}
   * @memberof ChatMessage
   */
  declare id: ChatMessageId;

  /**
   * @description <p>The unique identifier for the chat</p>
   * @type {ChatId}
   * @memberof ChatMessage
   */
  declare chatId: ChatId;

  declare role: MessageRole;

  declare content: MessageBlocks;

  /**
   * @description <p>The index of the message in the conversation</p>
   * @type {number}
   * @memberof ChatMessage
   */
  declare messageIndex: number;

  /**
   * @description <p>The date and time when the message was created</p>
   * @type {string}
   * @memberof ChatMessage
   */
  declare createdAt: Date;

  /**
   * @description <p>The date and time when the message was last updated</p>
   * @type {string}
   * @memberof ChatMessage
   */
  declare updatedAt: Date;


  public static builder = () => {
  return StrictBuilder<IChatMessage>();
    }
  }

