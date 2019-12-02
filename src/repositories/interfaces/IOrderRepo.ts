import { Email } from "../../models/clients/email";
import { Client } from "../../models/clients/client";
import { Order } from '../../models/orders/order';

export interface IClientRepo {
  save(order: Order): Promise<void>
  exists (order: Order): Promise<boolean>
  /*  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername (username: string): Promise<User>;
  exists (email: UserEmail): Promise<boolean>;
  */
  doSomethingHere();
}
