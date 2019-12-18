export default class OrderRequestedDeliveryDate implements ValueObject<OrderRequestedDeliveryDate> {

    private readonly _date: Date;

    get date(): Date {
        return this._date;
    }

    constructor(date: string) {
        /* let day = parseInt(date.split("/")[2]);
         let month = parseInt(date.split("/")[1]) - 1;
         let year = parseInt(date.split("/")[0]);
         if (day < 1 || day > 31) throw new Error('Day parameter should be between 1 and 31');
         else if (month < 0 || month > 11) throw new Error('Month parameter should be between 0 and 11');
         else if (year < 0 || year > 3000) throw new Error('Use a realistic Year parameter lol');*/
        this._date = new Date(date);
    }

    equals(object: OrderRequestedDeliveryDate): boolean {
        return this.date === object.date;
    }
}

Object.seal(OrderRequestedDeliveryDate);

