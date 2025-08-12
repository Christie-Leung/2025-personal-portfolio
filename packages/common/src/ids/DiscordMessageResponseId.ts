import { Id } from './Id';

export class DiscordMessageResponseId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'RP';

  public getPrefix(): string {
    return DiscordMessageResponseId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(DiscordMessageResponseId.PREFIX) && Id.looksLikeId(id);
  }
}
