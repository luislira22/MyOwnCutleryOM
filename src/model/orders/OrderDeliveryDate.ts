export default class OrderConclusionDate implements ValueObject<OrderConclusionDate> {

    private readonly _date: Date;

    get date(): Date {
        return this._date;
    }

    constructor(date: string) {
        this._date = new Date(date);
    }

    equals(object: OrderConclusionDate): boolean {
        return this.date === object.date;
    }

}

Object.seal(OrderConclusionDate);

