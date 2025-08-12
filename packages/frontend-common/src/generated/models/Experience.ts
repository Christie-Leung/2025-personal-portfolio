/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { WorkExperienceId } from '@2025-personal-portfolio/common/src/ids/WorkExperienceId';
import { CompanyId } from '@2025-personal-portfolio/common/src/ids/CompanyId';
import { WorkLocationType } from './WorkLocationType';
import { ExperienceBullet } from './ExperienceBullet';

interface IExperience {
  id: WorkExperienceId;
  title: string;
  companyId: CompanyId;
  locationType: WorkLocationType;
  isCurrent?: boolean;
  startDate: Date;
  endDate: Date;
  bullets: ExperienceBullet[];
  createdAt?: Date;
  updatedAt?: Date;
}


export class Experience implements IExperience {
  /**
   * @description <p>The unique identifier for the work experience</p>
   * @type {WorkExperienceId}
   * @memberof Experience
   */
  declare id: WorkExperienceId;

  /**
   * @description <p>The title of the work experience</p>
   * @type {string}
   * @memberof Experience
   */
  declare title: string;

  /**
   * @description <p>The unique identifier for the company</p>
   * @type {CompanyId}
   * @memberof Experience
   */
  declare companyId: CompanyId;

  /**
   * @description <p>The type of location for the work experience</p>
   * @type {WorkLocationType}
   * @memberof Experience
   */
  declare locationType: WorkLocationType;

  /**
   * @description <p>Indicates whether this work experience is current</p>
   * @type {boolean}
   * @memberof Experience
   */
  declare isCurrent?: boolean;

  /**
   * @description <p>The start date of the work experience</p>
   * @type {string}
   * @memberof Experience
   */
  declare startDate: Date;

  /**
   * @description <p>The end date of the work experience</p>
   * @type {string}
   * @memberof Experience
   */
  declare endDate: Date;

  /**
   * @description <p>A list of bullet points highlighting key achievements</p>
   * @type {ExperienceBullet[]}
   * @memberof Experience
   */
  declare bullets: ExperienceBullet[];

  /**
   * @description <p>The date and time when the work experience was created</p>
   * @type {string}
   * @memberof Experience
   */
  declare createdAt?: Date;

  /**
   * @description <p>The date and time when the work experience was last updated</p>
   * @type {string}
   * @memberof Experience
   */
  declare updatedAt?: Date;


  public static builder = () => {
  return StrictBuilder<IExperience>();
    }
  }

