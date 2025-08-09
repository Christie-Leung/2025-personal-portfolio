import { Id } from './Id';

export class ConversationId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'CV';

  public getPrefix(): string {
    return ConversationId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(ConversationId.PREFIX) && Id.looksLikeId(id);
  }
}
