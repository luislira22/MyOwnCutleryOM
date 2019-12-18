import {IBaseRepository} from "./interfaces/IBaseRepository";
import mongoose = require('mongoose');
import User from "../model/user/User";
import Client from "../model/user/client/Client";
import ClientMapper from "../mappers/users/ClientMapper";
import Admin from "../model/user/admin/Admin";
import IClientModel from "../dataAccess/schemas/users/interfaces/clients/IClientModel";
import AdminMapper from "../mappers/users/AdminMapper";
import IAdminModel from "../dataAccess/schemas/users/interfaces/admins/IAdminModel";

export default class UserRepository implements IBaseRepository<User> {

    private _clientModel: mongoose.Model<mongoose.Document>;
    private _adminModel: mongoose.Model<mongoose.Document>;
    private _userModel: mongoose.Model<mongoose.Document>;

    constructor(clientModel: mongoose.Model<mongoose.Document>, adminModel: mongoose.Model<mongoose.Document>, userModel: mongoose.Model<mongoose.Document>) {
        this._clientModel = clientModel;
        this._adminModel = adminModel;
        this._userModel = userModel
    }

    public async create(user: User): Promise<User> {
        if (user instanceof Client) return await this.createClient(user);
        else if (user instanceof Admin) return await this.createAdmin(user);
        else throw new Error();
    }

    private async createClient(client: Client): Promise<Client> {
        return new Promise<Client>((resolve, reject) => {
            let persistenceClient = ClientMapper.fromDomainToPersistence(client);
            this._clientModel.create(persistenceClient, (error: any, result: IClientModel) => {
                if (error) reject(error);
                else resolve(ClientMapper.fromPersistenceToDomain(result));
            });
        });
    }

    private async createAdmin(admin: Admin): Promise<Admin> {
        return new Promise<Admin>((resolve, reject) => {
            let persistenceAdmin = AdminMapper.fromDomainToPersistence(admin);
            this._adminModel.create(persistenceAdmin, (error: any, result: IAdminModel) => {
                if (error) reject(error);
                else resolve(AdminMapper.fromPersistenceToDomain(result));
            });
        });
    }

    public async findByEmail(email: string) : Promise<User> {
        return new Promise<User>((resolve, reject) => {
            console.log(this._userModel);
            this._userModel.findOne({email : email}, (error: any, result: any) => {
                if (error) reject(error);
                else if(result == null) resolve(null);
                else {
                    if (result.role == 'client') resolve(ClientMapper.fromPersistenceToDomain(result));
                    else if (result.role == 'admin') resolve(AdminMapper.fromPersistenceToDomain(result));
                    reject(new Error("invalid role found"));
                }
            });
        })
    }


    public async find(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            this._userModel.find({}, (error: any, result: mongoose.Document[]) => {
                if (error) reject(error);
                else {
                    let users: User[] = [];
                    console.log(result);
                    result.forEach(function (element: any) {
                        if (element.role == 'ClientModel') users.push(ClientMapper.fromPersistenceToDomain(element));
                        else if (element.role == 'AdminModel') users.push(AdminMapper.fromPersistenceToDomain(element));
                        else console.log("ERRO");
                    });
                    resolve(users);
                }
            });
        });
    }

    public async findOne(id: string): Promise<User> {
        throw new Error("Not implemented");
    }

    public async update(id: string, client: User): Promise<boolean> {
        throw new Error("Not implemented");
    }

    public async delete(id: string): Promise<boolean> {
        throw new Error("Not implemented");
    }
}
