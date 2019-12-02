import { ValueObject } from '../../core/domain/ValueObject';

interface QuantityProperties {
  value: number;
}

export class Quantity extends ValueObject<QuantityProperties> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props: QuantityProperties) {
    super(props);
  }

  public static create(quantity: number): Quantity {
    if (quantity < 0) {
      throw new Error('Quantity shouldn\'t be a negative value');
    } else if (quantity === null) {
      throw new Error('Quantity shouldn\'t be null');
    } else {
      return new Quantity({ value: quantity });
    }
  }
}
