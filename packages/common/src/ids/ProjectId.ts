import { Id } from './Id';

export class ProjectId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'PJ';

  public getPrefix(): string {
    return ProjectId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(ProjectId.PREFIX) && Id.looksLikeId(id);
  }
}
