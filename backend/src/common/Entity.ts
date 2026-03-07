import { createId } from '@paralleldrive/cuid2';

import { EntityProps } from './EntityProps';

export abstract class Entity<P extends EntityProps> {
  protected props: P;

  constructor(props: Omit<P, 'id'> & Partial<Pick<P, 'id'>>) {
    this.props = {
      id: props.id ?? createId(),
      ...props,
    } as P;
  }

  public getProps(): P {
    return Object.freeze(this.props);
  }

  public toString(): string {
    return `Abstract Entity (ID ${this.props.id})`;
  }
}
