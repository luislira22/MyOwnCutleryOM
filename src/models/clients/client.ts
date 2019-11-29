import { AggregateRoot } from '@node-ts/ddd';
import { Uuid, AggregateRootProperties } from '@node-ts/ddd-types';
import { Email } from './email';
import { Fullname } from './fullname';

export interface ClientProperties extends AggregateRootProperties {
  email: Email;
  password: string;
  address: string;
  fullname: Fullname;
  //id
}

export class Client extends AggregateRoot implements ClientProperties {
  email: Email;
  password: string;
  address: string;
  fullname: Fullname;

  static register(id: Uuid, email: Email, password: string, address: string, fullname: Fullname) {
    new Client(id);
  }
}
