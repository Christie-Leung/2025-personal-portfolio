import { Id } from './Id';

export class WorkExperienceId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'WE';

  public getPrefix(): string {
    return WorkExperienceId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(WorkExperienceId.PREFIX) && Id.looksLikeId(id);
  }
}
