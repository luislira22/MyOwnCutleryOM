import { ValueObject } from '../../core/domain/ValueObject';

interface OrderDateProperties {
  date: Date
}


export class OrderDate extends ValueObject<OrderDateProperties> {
  get value(): Date {
    return this.props.date;

  }


  constructor(props: OrderDateProperties) {
    super(props);
  }

  public static create(myDate: Date): OrderDate {
    if (myDate.getDate() < 1 || myDate.getDate() > 31) {
      throw new Error('Day parameter should be between 1 and 31');
    } else if (myDate.getMonth() < 0 || myDate.getMonth() > 11) {
      throw new Error('Month parameter should be between 0 and 11. JS is messy sometimes i know :)');
    } else if (myDate.getFullYear() < 0 || myDate.getFullYear() > 3000) {
      throw new Error('Either you are really old, or you are living in Mars... Use a realistic Year parameter');
    } else {
      return new OrderDate({ date: myDate });
    }
  }

}

