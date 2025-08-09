import { Id } from './Id';

export class CompanyId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'CP';

  public getPrefix(): string {
    return CompanyId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(CompanyId.PREFIX) && Id.looksLikeId(id);
  }
}
