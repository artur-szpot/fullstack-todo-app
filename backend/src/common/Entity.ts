import { createId } from '@paralleldrive/cuid2';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const EntityProps = t.partial(
  {
    id: NonEmptyString,
  },
  'optionalEntityId',
);

export abstract class Entity<P> {
  protected props: P;

  protected abstract validateProps(input: unknown): P;

  constructor(props: unknown) {
    const validatedProps = {
      id: createId(),
      ...this.validateProps(props),
    };
    this.props = validatedProps;
  }

  public getProps(): P {
    return Object.freeze(this.props);
  }

  public abstract toString(): string;
}
