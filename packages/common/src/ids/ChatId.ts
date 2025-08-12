import { Id } from './Id';

export class ChatId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'CH';

  public getPrefix(): string {
    return ChatId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(ChatId.PREFIX) && Id.looksLikeId(id);
  }
}
