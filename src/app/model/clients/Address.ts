import IAddress = require('./interfaces/Address');

class Address {

    private _address: IAddress;

    get address(): string {
        return this._address.address
    }

    get postalcode(): string {
        return this._address.postalcode
    }

    get city(): string {
        return this._address.city
    }

    get country(): string {
        return this._address.country
    }

    constructor(address: IAddress) {
        if (address.address === undefined || address.address === null || address.address.length <= 2 || address.address.length > 100 ||
            address.city === undefined || address.city === null || address.city.length <= 2 || address.city.length > 100 ||
            address.postalcode === undefined || address.postalcode === null || address.postalcode.length <= 2 || address.postalcode.length > 100 ||
            address.country === undefined || address.country === null || address.country.length <= 2 || address.country.length > 100) {
            throw new Error('Address, city, postalcode and country must be filled.')
        } else {
            this._address = address
        }
    }
}

Object.seal(Address);
export = Address;

