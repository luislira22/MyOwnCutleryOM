import IQuantity = require('../../dataAccess/schemas/orders/interfaces/Quantity');

export default class Quantity implements ValueObject<Quantity> {

    private _quantity: IQuantity;

    get quantity(): number {
        return this._quantity.quantity
    }

    private constructor(quantity: IQuantity) {
        if (quantity.quantity < 0) {
            throw new Error('Quantity shouldn\'t be a negative value');
        } else if (quantity.quantity === null) {
            throw new Error('Quantity shouldn\'t be null');
        } else {
            this._quantity = quantity
        }
    }

    equals(object: Quantity): boolean {
        return this.quantity === object.quantity;
    }

}

Object.seal(Quantity);


