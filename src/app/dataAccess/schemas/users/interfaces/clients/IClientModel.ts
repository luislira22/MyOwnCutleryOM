import IUserModel from "../IUserModel";
import IFullname from "./IFullname";
import IAddress from "./IAddress";

export default interface IClientModel extends IUserModel{
    fullname: IFullname;
    address: IAddress;
    nif: number;
    priority: number;
}
