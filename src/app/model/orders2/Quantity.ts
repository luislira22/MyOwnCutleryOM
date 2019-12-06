export default class Quantity implements ValueObject<Quantity> {

    private readonly _quantity: number;

    get quantity(): number {
        return this._quantity
    }

    constructor(quantity: number) {
        if (quantity < 0) throw new Error('Quantity shouldn\'t be a negative value');
        else if (quantity === null) throw new Error('Quantity shouldn\'t be null');
        this._quantity = quantity;
    }

    equals(object: Quantity): boolean {
        return this.quantity === object.quantity;
    }
}

Object.seal(Quantity);


