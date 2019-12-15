export default class Priority implements ValueObject<Priority> {

    _value: number;

    constructor(value: number) {
        if (value === undefined || value === null || value > 10 || value < 1) {
            throw new Error('Priority must be between 1 and 10.')
        }
        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    equals(object: Priority): boolean {
        return this.value === object.value;
    }
}

Object.seal(Priority);

