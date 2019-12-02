import { Client } from '../clients/client';
import { Quantity } from './quantity';
import { AggregateRoot } from '../../core/domain/aggregateRoot';
import { OrderDate } from './orderdate';
import { Status } from './status';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';


interface OrderProperties {
  client: Client;
  quantity: Quantity;
  date: OrderDate;
  status: Status;
  //id
}

export class Order extends AggregateRoot<OrderProperties> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get client(): Client {
    return this.props.client;
  }

  get quantity(): Quantity {
    return this.props.quantity;
  }

  get date(): OrderDate {
    return this.props.date;
  }

  get status(): Status {
    return this.props.status;
  }


  private constructor(props: OrderProperties, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: OrderProperties, id?: UniqueEntityID) {
    const guardedProps = [
      { argument: props.client, argumentName: 'client' },
      { argument: props.quantity, argumentName: 'quantity' },
      { argument: props.date, argumentName: 'date' },
      { argument: props.status, argumentName: 'status' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Order>(guardResult.message);
    } else {
      const order = new Order({
        ...props,
        client: props.client,
        quantity: props.quantity,
        date: props.date,
        status: props.status,
      }, id);

      //TODO Generate Id

      return Result.ok<Order>(order);
    }
  }
}

