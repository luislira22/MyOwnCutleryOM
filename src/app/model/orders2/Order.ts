import Client from "../clients2/Client"
import Quantity from "./Quantity";
import Status from "./Status";
import OrderDate from "./OrderDate";

export default class Order implements Entity<Order> {

    private readonly _id: string;
    private readonly _client: Client;
    private readonly _productID: string;
    private _quantity: Quantity;
    private _status: Status;
    private readonly _date: OrderDate;

    constructor(client: Client, productID: string, quantity: Quantity, status: Status, date: OrderDate, id?: string) {
        if (client === undefined || client === null ||
            quantity === undefined || quantity === null ||
            status === undefined || status === null ||
            date === undefined || date === null ||
            productID === undefined || productID === null) {
            throw new Error('Values cannot be null or undefined.');
        }
        this._id = id; //MAYBE NEED TO BE FIXED
        this._client = client;
        this._productID = productID;
        this._quantity = quantity;
        this._status = status;
        this._date = date;
    }

    get id(): string {
        return this._id;
    }

    get client(): Client {
        return this._client;
    }

    get quantity(): Quantity {
        return this._quantity;
    }

    set quantity(quantity: Quantity) {
        this._quantity = quantity;
    }

    get date(): OrderDate {
        return this._date;
    }

    get status(): Status {
        return this._status;
    }

    get productID(): string {
        return this._productID
    }

    public equals(object: Order): boolean {
        return this.client.equals(object.client)
            && this.quantity.equals(object.quantity)
            && this.date.equals(object.date)
            && this.status.equals(object.status)
            && this.productID === object.productID;
    }

    isEntity(): boolean {
        return this.id != undefined;
    }

}

Object.seal(Order);
