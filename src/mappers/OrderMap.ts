import { Mapper } from '../core/infra/Mapper';
import { Order } from '../models/orders/order';
import { Client } from '../models/clients/client';

export class OrderMap extends Mapper<Order> {

  public static toPersistence(order: Order): any {
    return {
      id: order.id,
      client: order.client, //TODO check if ID works
      quantity: order.quantity.value,
      date: order.date.value,
      status: order.status.toString,
    };
  }

  public static toDomain(raw: any): Client {
    //TODO
    return null;
  }
}
