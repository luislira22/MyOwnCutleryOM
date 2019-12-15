export default class Nif implements ValueObject<Nif> {

    _value: number;

    constructor(value: number) {
        if ( value == null || value > 999999999 || value < 100000000) {
            throw new Error('Nif must be correct.')
        }
        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    equals(object: Nif): boolean {
        return this.value === object.value;
    }
}

Object.seal(Nif);

