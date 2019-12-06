export default class OrderDate implements ValueObject<OrderDate> {

    private readonly _date: Date;

    get date(): Date {
        return this._date;
    }

    constructor(date: Date) {
        if (date.getDate() < 1 || date.getDate() > 31) throw new Error('Day parameter should be between 1 and 31');
        else if (date.getMonth() < 0 || date.getMonth() > 11) throw new Error('Month parameter should be between 0 and 11');
        else if (date.getFullYear() < 0 || date.getFullYear() > 3000) throw new Error('Use a realistic Year parameter lol');
        this._date = date
    }

    equals(object: OrderDate): boolean {
        return this.date === object.date;
    }

}

Object.seal(OrderDate);


