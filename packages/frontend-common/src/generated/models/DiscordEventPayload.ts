/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';




interface IDiscordEventPayload {
  chatId: string;
  threadId: string;
  messageId: string;
  authorId: string;
  authorUsername: string;
  content: string;
  createdAt: Date;
}


export class DiscordEventPayload implements IDiscordEventPayload {
  declare chatId: string;

  declare threadId: string;

  declare messageId: string;

  declare authorId: string;

  declare authorUsername: string;

  declare content: string;

  declare createdAt: Date;


  public static builder = () => {
  return StrictBuilder<IDiscordEventPayload>();
    }
  }

