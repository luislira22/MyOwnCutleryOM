import IOrderDate = require('./interfaces/OrderDate');

export default class OrderDate {

    private _orderDate: IOrderDate;

    get date(): Date {
        return this._orderDate.date
    }

    private constructor(orderDate: IOrderDate) {
        if (orderDate.date.getDate() < 1 || orderDate.date.getDate() > 31) {
            throw new Error('Day parameter should be between 1 and 31');
        } else if (orderDate.date.getMonth() < 0 || orderDate.date.getMonth() > 11) {
            throw new Error('Month parameter should be between 0 and 11');
        } else if (orderDate.date.getFullYear() < 0 || orderDate.date.getFullYear() > 3000) {
            throw new Error('Use a realistic Year parameter lol');
        } else {
            this._orderDate = orderDate
        }
    }

}

Object.seal(OrderDate);


