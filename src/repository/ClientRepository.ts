import mongoose = require('mongoose');
import {IBaseRepository} from "./interfaces/IBaseRepository";
import Client from "../model/user/client/Client";
import ClientMapper from "../mappers/users/ClientMapper";
import IClientModel from "../dataAccess/schemas/users/interfaces/clients/IClientModel";

export default class ClientRepository implements IBaseRepository<Client> {

    private _clientModel: mongoose.Model<mongoose.Document>;
    private _userModel: mongoose.Model<mongoose.Document>;

    constructor(clientModel: mongoose.Model<mongoose.Document>, userModel: mongoose.Model<mongoose.Document>) {
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
            this._userModel.find({role: "client", nif: {$ne: 999999999}}, (error: any, result: IClientModel[]) => {
                if (error) reject(error);
                else {
                    let clients = [];
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
            this._userModel.findOne({_id: id, role: "client"}, (error: any, result: IClientModel) => {
                if (error) reject(error);
                else {
                    resolve(ClientMapper.fromPersistenceToDomain(result));
                }
            });
        });
    }

    public async update(id: string, client: Client): Promise<boolean> {
        let persistenceClient = ClientMapper.fromDomainToPersistence(client);
        return new Promise<boolean>(async (resolve) => {
            await this._clientModel.findOneAndUpdate({_id: id, role: "client"}, persistenceClient, (error: any, result: any) => {
                resolve(!error);
            });
        });
    }

    public async delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._userModel.deleteOne({_id: id, role: "client"}, (error: any) => {
                resolve(!error);
            });
        });
    }
}
