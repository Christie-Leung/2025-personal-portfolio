import { v4 as uuid } from 'uuid';


export abstract class Id {
  private static REGEX = /^[A-Z]{2}[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;

  protected value: string;

  /**
   * Checks whether the provided string looks like an {@link Id}
   * @param id  the string to check
   * @returns whether the id looks like an {@link id}
   */
  public static looksLikeId = (id: string): boolean => {
    return (
      id !== null && id !== undefined && id.length === 38 && Id.REGEX.test(id)
    );
  };

  /**
   * Creates a {@link Id} with the given prefix
   * @param prefix the prefix to create an {@link Id} for
   * @returns the Id
   */
  public static create = (prefix: string) => {
    const input = uuid();

    return prefix + input;
  };

  /**
   * Constructor for generating a new {@link Id}
   */
  public constructor(id?: string) {
    if (!id) {
      this.value = Id.create(this.getPrefix());
      return;
    }

    if (!this.isValid(id)) {
      throw new Error(`${id} is not valid`);
    }

    this.value = id;
  }

  /**
   * Checks the {@link Id}
   * @param id the string id to check
   * @returns
   */
  public isValid = (id: string): boolean => {
    return id !== null && id.startsWith(this.getPrefix()) && Id.looksLikeId(id);
  };

  /**
   * Abstract method for returning the prefix
   */
  protected abstract getPrefix(): string;

  /**
   * Returns the value of the id
   * @returns the string value of the id
   */
  public getValue() {
    return this.value;
  }

  /**
   * Checks if the ids equal
   * @param other
   */
  public isEqual(other: Id) {
    return other.getValue() === this.getValue();
  }

  /**
   * Checks if the ids are not equal
   * @param other
   */
  public isNotEqual(other: Id) {
    return other.getValue() !== this.getValue();
  }

  public toString() {
    return this.getValue();
  }
}
