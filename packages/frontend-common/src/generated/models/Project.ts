/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { ProjectId } from '@2025-personal-portfolio/common/src/ids/ProjectId';
import { MessageBlocks } from './MessageBlocks';
import { ProjectStatus } from './ProjectStatus';
import { ProjectReview } from './ProjectReview';
import { SocialUrl } from './SocialUrl';

interface IProject {
  id: ProjectId;
  name: string;
  slug: string;
  description: MessageBlocks;
  tags?: string[];
  status?: ProjectStatus;
  reviews?: ProjectReview[];
  link: SocialUrl[];
  appIcon: string;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
}


export class Project implements IProject {
  /**
   * @description <p>The unique identifier for the project</p>
   * @type {ProjectId}
   * @memberof Project
   */
  declare id: ProjectId;

  /**
   * @description <p>The name of the project</p>
   * @type {string}
   * @memberof Project
   */
  declare name: string;

  /**
   * @description <p>The URL-friendly identifier for the project</p>
   * @type {string}
   * @memberof Project
   */
  declare slug: string;

  declare description: MessageBlocks;

  /**
   * @description <p>A list of tags associated with the project</p>
   * @type {string[]}
   * @memberof Project
   */
  declare tags?: string[];

  /**
   * @description <p>The current status of the project</p>
   * @type {ProjectStatus}
   * @memberof Project
   */
  declare status?: ProjectStatus;

  /**
   * @description <p>User reviews and ratings</p>
   * @type {ProjectReview[]}
   * @memberof Project
   */
  declare reviews?: ProjectReview[];

  /**
   * @description <p>A list of social media links associated with the project</p>
   * @type {SocialUrl[]}
   * @memberof Project
   */
  declare link: SocialUrl[];

  /**
   * @description <p>The URL link to the project&#39;s icon</p>
   * @type {string}
   * @memberof Project
   */
  declare appIcon: string;

  /**
   * @description <p>The URL link to the project&#39;s banner image</p>
   * @type {string}
   * @memberof Project
   */
  declare banner: string;

  /**
   * @description <p>The date and time when the project was created</p>
   * @type {string}
   * @memberof Project
   */
  declare createdAt: Date;

  /**
   * @description <p>The date and time when the project was last updated</p>
   * @type {string}
   * @memberof Project
   */
  declare updatedAt: Date;


  public static builder = () => {
  return StrictBuilder<IProject>();
    }
  }

