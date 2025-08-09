import { Id } from './Id';

export class ProjectReviewId extends Id {
  // This is required for stricter TS check
  // @ts-ignore
  private readonly _brand!: void;

  public static PREFIX = 'PR';

  public getPrefix(): string {
    return ProjectReviewId.PREFIX;
  }

  public static isValid(id: string): boolean {
    return id !== null && id.startsWith(ProjectReviewId.PREFIX) && Id.looksLikeId(id);
  }
}
