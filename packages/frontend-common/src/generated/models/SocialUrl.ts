/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { UrlType } from './UrlType';

interface ISocialUrl {
  platform: UrlType;
  link: string;
}


export class SocialUrl implements ISocialUrl {
  /**
   * @description <p>The type of URL, either a website or a social media link</p>
   * @type {UrlType}
   * @memberof SocialUrl
   */
  declare platform: UrlType;

  /**
   * @description <p>The URL link to the social media profile</p>
   * @type {string}
   * @memberof SocialUrl
   */
  declare link: string;


  public static builder = () => {
  return StrictBuilder<ISocialUrl>();
    }
  }

