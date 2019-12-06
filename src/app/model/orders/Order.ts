import IOrderModel = require("../../dataAccess/schemas/orders/interfaces/Order");
import Client = require("../clients/interfaces/Client");
import Quantity = require("../../dataAccess/schemas/orders/interfaces/Quantity");
import OrderDate = require("../../dataAccess/schemas/orders/interfaces/OrderDate");
import Status = require("../../dataAccess/schemas/orders/interfaces/Status");

export default class Order implements Entity<Order> {

    private _order: IOrderModel;

    constructor(order: IOrderModel) {
        this._order = order;
    }

    get client(): Client {
        return this._order.client
    }

    get quantity(): Quantity {
        return this._order.quantity
    }

    get date(): OrderDate {
        return this._order.date
    }

    get status(): Status {
        return this._order.status
    }

    get productID(): string {
        return this._order.productID
    }

    public equals(object: Order): boolean {
        if (object == null) return false;
        if (this === object) return true;
        if (!this.isEntity()) return false;
        return this._order.id.equals(object._order.id);
    }

    isEntity(): boolean {
        return this._order.id != undefined;
    }

}

Object.seal(Order);
