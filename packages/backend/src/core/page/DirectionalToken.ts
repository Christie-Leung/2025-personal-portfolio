import { Buffer } from 'node:buffer';
import { Id } from '@2025-personal-portfolio/common/dist/ids';
import { idUtils } from '@2025-personal-portfolio/common/dist/utils';

export enum Direction {
  Forward = 1,
  Backward = -1,
}

export class DirectionalToken {
  id: Id;

  direction: Direction;

  constructor(id: Id, direction: Direction) {
    this.id = id;
    this.direction = direction;
  }

  /**
   * Creates a {@link DirectionalToken} from a base64 encoded string.
   */
  public static fromString(token: string): DirectionalToken {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded) as { id: string; direction: Direction };

    return new DirectionalToken(idUtils.fromHex(parsed.id), parsed.direction);
  }

  /**
   * Creates a forward {@link DirectionalToken} from an {@link Id}.
   * @param id
   */
  public static forward(id: Id): DirectionalToken {
    return new DirectionalToken(id, Direction.Forward);
  }

  /**
   * Creates a backward {@link DirectionalToken} from an {@link Id}.
   * @param id
   */
  public static backward(id: Id): DirectionalToken {
    return new DirectionalToken(id, Direction.Backward);
  }

  /**
   * Returns the base64 encoded string representation of this token.
   */
  public encode(): string {
    return Buffer.from(
      JSON.stringify({
        id: this.id.getValue(),
        direction: this.direction,
      }),
    ).toString('base64');
  }
}
