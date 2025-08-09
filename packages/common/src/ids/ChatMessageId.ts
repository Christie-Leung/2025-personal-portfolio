import { Id } from './Id';

export class ChatMessageId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'CM';

  public getPrefix(): string {
    return ChatMessageId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(ChatMessageId.PREFIX) && Id.looksLikeId(id);
  }
}
