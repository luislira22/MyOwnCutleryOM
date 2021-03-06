import {IBaseRepository} from "./interfaces/IBaseRepository";
import Order from "../model/orders/Order";
import * as mongoose from "mongoose";
import ClientMapper from "../mappers/users/ClientMapper";
import OrderMapper from "../mappers/orders/OrderMapper";
import IOrderFullModel from "../dataAccess/schemas/orders/interfaces/IOrderFullModel";
import IOrderModel from "../dataAccess/schemas/orders/interfaces/IOrderModel";
import IClientModel from "../dataAccess/schemas/users/interfaces/clients/IClientModel";
import Client from "../model/user/client/Client";
import {Types} from "mongoose";

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

    public async findAccepted(): Promise<Order[]> {
        return new Promise<Order[]>((resolve, reject) => {
            this._orderModel.find({status: "ACCEPTED"}, (error: any, result: IOrderFullModel[]) => {
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
        return new Promise<Order>( (resolve, reject) => {
            this._orderModel.findOne({_id: id}, (error: any, result: IOrderFullModel) => {
                if (error) reject(error);
                else {
                    if (result == null) reject("Order does not exists");
                    else resolve(OrderMapper.fromPersistenceToDomain(result));
                }
            }).populate('client');
        });
    }

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
        let orderPersistence = OrderMapper.fromDomainToPersistence(order);
        return new Promise<boolean>(async (resolve) => {
            await this._orderModel.findOneAndUpdate({_id: id}, orderPersistence, (error: any) => {
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

    public async getMostOrderedProductsByProductsQuantity() : Promise<string[]>{
        return new Promise<string[]>((resolve,reject) => {
            this._orderModel.aggregate([
                {
                    "$group" :
                        {
                            _id: "$productID",
                            totalProducts: {"$sum": "$quantity"}
                        }
                },
                {"$sort" :
                        {totalProducts : -1}
                },
                {"$limit": 3}
            ],(error: any, result: mongoose.Document[]) => {
                if (error) reject(error);
                else {
                    console.log(result);
                    let productIds : string[] = [];
                    result.forEach(function (element: mongoose.Document) {
                        productIds.push(element._id);
                    });
                    resolve(productIds);
                }
            });
        });
    }

    public async getMostOrderedProductsByOrdersQuantity() : Promise<string[]>{
        return new Promise<string[]>((resolve,reject) => {
            this._orderModel.aggregate([
                {
                    "$group" :
                        {
                            _id: "$productID",
                            totalOrders: {"$sum": 1}
                        }
                },
                {"$sort" :
                        {totalOrders : -1}
                },
                {"$limit": 3}
            ],(error: any, result: mongoose.Document[]) => {
                if (error) reject(error);
                else {
                    console.log(result);
                    let productIds : string[] = [];
                    result.forEach(function (element: mongoose.Document) {
                        productIds.push(element._id);
                    });
                    resolve(productIds);
                }
            });
        });
    }
}
