import mongoose = require('mongoose');
import {IBaseRepository} from "./interfaces/IBaseRepository";
import User from "../model/user/User";
import Client from "../model/user/client/Client";
import ClientMapper from "../mappers/users/ClientMapper";
import IClientModel from "../dataAccess/schemas/users/interfaces/clients/IClientModel";

export default class ClientRepository implements IBaseRepository<Client> {

    private _clientModel: mongoose.Model<mongoose.Document>;
    private _userModel: mongoose.Model<mongoose.Document>;

    constructor(clientModel?: mongoose.Model<mongoose.Document>, userModel?: mongoose.Model<mongoose.Document>) {
        this._clientModel = clientModel;
        this._userModel = userModel;
    }

    public async create(client: Client): Promise<Client> {
        return new Promise<Client>((resolve, reject) => {
            let persistenceClient = ClientMapper.fromDomainToPersistence(client);
            this._clientModel.create(persistenceClient, (error: any, result: IClientModel) => {
                if (error) reject(error);
                else resolve(ClientMapper.fromPersistenceToDomain(result));
            });
        });
    }

    public async find(): Promise<Client[]> {
        return new Promise<Client[]>((resolve, reject) => {
            this._userModel.find({_role: "client"}, (error: any, result: IClientModel[]) => {
                if (error) reject(error);
                else {
                    let clients = [];
                    console.log(result);
                    result.forEach(function (element: IClientModel) {
                        clients.push(ClientMapper.fromPersistenceToDomain(element))
                    });
                    resolve(clients);
                }
            });
        });
    }

    public async findOne(id: string): Promise<Client> {
        return new Promise<Client>((resolve, reject) => {
            this._userModel.find({_id: id, _role: "client"}, (error: any, result: IClientModel) => {
                if (error) reject(error);
                else resolve(ClientMapper.fromPersistenceToDomain(result));
            });
        });
    }

    public async update(id: string, client: User): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            await this._userModel.update({_id: id, _role: "client"}, client, (error: any) => {
                resolve(!error);
            });
        });
    }

    public async delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._userModel.deleteOne({_id: id, _role: "client"}, (error: any) => {
                resolve(!error);
            });
        });
    }
}
