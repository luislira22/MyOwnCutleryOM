import { Email } from "../../models/clients/email";
import { Client } from "../../models/clients/client";

export interface IClientRepo {
  save(client: Client): Promise<void>
  exists (email: Email): Promise<boolean>
  /*  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername (username: string): Promise<User>;
  exists (email: UserEmail): Promise<boolean>;
  */
  doSomethingHere();
}
