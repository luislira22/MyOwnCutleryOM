export default class NIF implements ValueObject<NIF> {

    _nif: number;

    constructor(nif: number) {
        if (nif === undefined || nif === null || nif > 999999999 || nif < 100000000) {
            throw new Error('NIF must be correct.')
        }
        this._nif = nif;
    }

    get nif(): number {
        return this._nif;
    }

    equals(object: NIF): boolean {
        return this.nif === object.nif;
    }
}

Object.seal(NIF);

