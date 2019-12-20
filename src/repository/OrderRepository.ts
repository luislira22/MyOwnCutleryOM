import {IBaseRepository} from "./interfaces/IBaseRepository";
import Order from "../model/orders/Order";
import * as mongoose from "mongoose";
import ClientMapper from "../mappers/users/ClientMapper";
import OrderMapper from "../mappers/orders/OrderMapper";
import IOrderFullModel from "../dataAccess/schemas/orders/interfaces/IOrderFullModel";
import IOrderModel from "../dataAccess/schemas/orders/interfaces/IOrderModel";
import IClientModel from "../dataAccess/schemas/users/interfaces/clients/IClientModel";
import Client from "../model/user/client/Client";

export default class OrderRepository implements IBaseRepository<Order> {

    private _orderModel: mongoose.Model<mongoose.Document>;

    constructor(orderMode: mongoose.Model<mongoose.Document>) {
        this._orderModel = orderMode;
    }

    //Possivelmente não funciona
    public async create(order: Order): Promise<Order> {
        let persistenceOrder = OrderMapper.fromDomainToPersistence(order);
        let savedOrder = await new Promise<IOrderModel>((resolve, reject) => {
            this._orderModel.create(persistenceOrder, (error: any, result: IOrderModel) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
        return this.findOne(savedOrder._id);
    }

    //TODO Populate make sure it's working
    public async find(): Promise<Order[]> {
        return new Promise<Order[]>((resolve, reject) => {
            this._orderModel.find({}, (error: any, result: IOrderFullModel[]) => {
                if (error) reject(error);
                else {
                    let orders = [];
                    result.forEach(function (element: IOrderFullModel) {
                        orders.push(OrderMapper.fromPersistenceToDomain(element))
                    });
                    resolve(orders);
                }
            }).populate('client');
        });
    }

    public async findOne(id: string): Promise<Order> {
        return new Promise<Order>((resolve, reject) => {
            this._orderModel.findOne({_id: id}, (error: any, result: IOrderFullModel) => {
                if (error) reject(error);
                else resolve(OrderMapper.fromPersistenceToDomain(result));
            }).populate('client');
        });
    }

    //TODO!!!!!!!!!!!!!!!!!!!!!
    public async findByClientId(id: string) : Promise<Order[]> {
        return new Promise<Order[]>((resolve, reject) => {
            this._orderModel.find({client: id}, (error: any, result: IOrderFullModel[]) => {
                if (error) reject(error);
                else {
                    let orders = [];
                    result.forEach(function (element: IOrderFullModel) {
                       orders.push(OrderMapper.fromPersistenceToDomain(element));
                    });
                    resolve(orders);
                }
            }).populate('client');
        });
    }

    public async update(id: string, order: Order): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            await this._orderModel.update({_id: id}, order, (error: any) => {
                resolve(!error);
            });
        });
    }

    public async delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._orderModel.deleteOne({_id: id}, (error: any) => {
                resolve(!error);
            });
        });
    }
}
