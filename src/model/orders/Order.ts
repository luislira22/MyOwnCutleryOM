import Client from '../user/client/Client'
import OrderQuantity from "./OrderQuantity";
import OrderStatus from "./OrderStatus";
import OrderDate from "./OrderDate";
import OrderDeliveryDate from "./OrderDeliveryDate";
import OrderRequestedDeliveryDate from "./OrderRequestedDeliveryDate";
import OrderConclusionDate from "./OrderDeliveryDate";

export default class Order {

    private readonly _id: string;
    private readonly _client: Client;
    private readonly _productID: string;
    private _quantity: OrderQuantity;
    private _status: OrderStatus;
    private readonly _date: OrderDate;
    private readonly _deliveryDate: OrderDeliveryDate;
    private readonly _requestDeliveryDate: OrderRequestedDeliveryDate;

    constructor(client: Client, productID: string, quantity: OrderQuantity, status: OrderStatus, date: OrderDate, requestDeliveryDate: OrderRequestedDeliveryDate, id?: string) {
        if (quantity === undefined || quantity === null ||
            status === undefined || status === null ||
            date === undefined || date === null ||
            requestDeliveryDate === undefined || requestDeliveryDate === null ||
            productID === undefined || productID === null) {
            throw new Error('Values cannot be null or undefined.');
        }
        this._id = id;
        this._client = client;
        this._productID = productID;
        this._quantity = quantity;
        this._status = status;
        this._date = date;
        this._requestDeliveryDate = requestDeliveryDate;
    }

    get id(): string {
        return this._id;
    }

    get client(): Client {
        return this._client;
    }

    get quantity(): OrderQuantity {
        return this._quantity;
    }

    set quantity(quantity: OrderQuantity) {
        this._quantity = quantity;
    }

    get date(): OrderDate {
        return this._date;
    }

    get deliveryDate(): OrderConclusionDate {
        return this._deliveryDate;
    }

    get requestDeliveryDate(): OrderRequestedDeliveryDate {
        return this._requestDeliveryDate;
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get productID(): string {
        return this._productID
    }

}

Object.seal(Order);
