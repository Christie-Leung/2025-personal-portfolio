/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { ProjectReviewId } from '@2025-personal-portfolio/common/src/ids/ProjectReviewId';
import { ProjectId } from '@2025-personal-portfolio/common/src/ids/ProjectId';

interface IProjectReview {
  id: ProjectReviewId;
  projectId: ProjectId;
  reviewerName: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}


export class ProjectReview implements IProjectReview {
  /**
   * @description <p>The unique identifier for the project review</p>
   * @type {ProjectReviewId}
   * @memberof ProjectReview
   */
  declare id: ProjectReviewId;

  /**
   * @description <p>The unique identifier for the project</p>
   * @type {ProjectId}
   * @memberof ProjectReview
   */
  declare projectId: ProjectId;

  /**
   * @description <p>The name of the user who wrote the review</p>
   * @type {string}
   * @memberof ProjectReview
   */
  declare reviewerName: string;

  /**
   * @description <p>The rating given by the user</p>
   * @type {number}
   * @memberof ProjectReview
   * minimum: 1
   * maximum: 5
   */
  declare rating: number;

  /**
   * @description <p>The user&#39;s comment on the project</p>
   * @type {string}
   * @memberof ProjectReview
   */
  declare comment?: string;

  /**
   * @description <p>The date and time when the review was created</p>
   * @type {string}
   * @memberof ProjectReview
   */
  declare createdAt: Date;


  public static builder = () => {
  return StrictBuilder<IProjectReview>();
    }
  }

