import IOrderModel = require("./interfaces/Order");
import Client = require("../clients/interfaces/Client");
import Quantity = require("./interfaces/Quantity");
import OrderDate = require("./interfaces/OrderDate");
import Status = require("./interfaces/Status");

export default class Order {

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

}

Object.seal(Order);
