import { Id } from './Id';

export class ExperienceBulletId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'EB';

  public getPrefix(): string {
    return ExperienceBulletId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(ExperienceBulletId.PREFIX) && Id.looksLikeId(id);
  }
}
