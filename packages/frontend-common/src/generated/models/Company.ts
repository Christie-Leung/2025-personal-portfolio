/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { CompanyId } from '@2025-personal-portfolio/common/src/ids/CompanyId';

interface ICompany {
  id: CompanyId;
  name: string;
  location: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export class Company implements ICompany {
  /**
   * @description <p>The unique identifier for the company</p>
   * @type {CompanyId}
   * @memberof Company
   */
  declare id: CompanyId;

  /**
   * @description <p>The name of the company</p>
   * @type {string}
   * @memberof Company
   */
  declare name: string;

  /**
   * @description <p>The location of the company</p>
   * @type {string}
   * @memberof Company
   */
  declare location: string;

  /**
   * @description <p>The URL link to the company&#39;s website</p>
   * @type {string}
   * @memberof Company
   */
  declare website?: string;

  /**
   * @description <p>The date and time when the company was created</p>
   * @type {string}
   * @memberof Company
   */
  declare createdAt?: Date;

  /**
   * @description <p>The date and time when the company was last updated</p>
   * @type {string}
   * @memberof Company
   */
  declare updatedAt?: Date;


  public static builder = () => {
  return StrictBuilder<ICompany>();
    }
  }

