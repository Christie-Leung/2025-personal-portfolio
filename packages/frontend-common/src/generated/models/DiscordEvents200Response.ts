/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';




interface IDiscordEvents200Response {
  ok?: boolean;
  ignored?: boolean;
}


export class DiscordEvents200Response implements IDiscordEvents200Response {
  declare ok?: boolean;

  declare ignored?: boolean;


  public static builder = () => {
  return StrictBuilder<IDiscordEvents200Response>();
    }
  }

