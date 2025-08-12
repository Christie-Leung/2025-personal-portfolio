/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { ExperienceBulletId } from '@2025-personal-portfolio/common/src/ids/ExperienceBulletId';
import { WorkExperienceId } from '@2025-personal-portfolio/common/src/ids/WorkExperienceId';

interface IExperienceBullet {
  id: ExperienceBulletId;
  experienceId: WorkExperienceId;
  orderIndex: number;
  bulletPoint: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export class ExperienceBullet implements IExperienceBullet {
  /**
   * @description <p>The unique identifier for the experience bullet point</p>
   * @type {ExperienceBulletId}
   * @memberof ExperienceBullet
   */
  declare id: ExperienceBulletId;

  /**
   * @description <p>The unique identifier for the work experience</p>
   * @type {WorkExperienceId}
   * @memberof ExperienceBullet
   */
  declare experienceId: WorkExperienceId;

  /**
   * @description <p>The order index of the bullet point</p>
   * @type {number}
   * @memberof ExperienceBullet
   */
  declare orderIndex: number;

  /**
   * @description <p>The bullet point text</p>
   * @type {string}
   * @memberof ExperienceBullet
   */
  declare bulletPoint: string;

  /**
   * @description <p>The date and time when the bullet point was created</p>
   * @type {string}
   * @memberof ExperienceBullet
   */
  declare createdAt?: Date;

  /**
   * @description <p>The date and time when the bullet point was last updated</p>
   * @type {string}
   * @memberof ExperienceBullet
   */
  declare updatedAt?: Date;


  public static builder = () => {
  return StrictBuilder<IExperienceBullet>();
    }
  }

