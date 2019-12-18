export default class OrderQuantity implements ValueObject<OrderQuantity> {

    private readonly _quantity: number;

    get quantity(): number {
        return this._quantity
    }

    constructor(quantity: number) {
        if (quantity < 0) throw new Error('OrderQuantity shouldn\'t be a negative value');
        else if (quantity === null) throw new Error('OrderQuantity shouldn\'t be null');
        this._quantity = quantity;
    }

    equals(object: OrderQuantity): boolean {
        return this.quantity === object.quantity;
    }
}

Object.seal(OrderQuantity);
