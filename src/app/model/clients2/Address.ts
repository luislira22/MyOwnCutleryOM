export default class Address implements ValueObject<Address> {

    _address: string;
    _postalcode: string;
    _city: string;
    _country: string;

    constructor(address: string, postalcode: string, city: string, country: string) {
        if (address === undefined || address === null || address.length <= 2 || address.length > 100 ||
            postalcode === undefined || postalcode === null || postalcode.length <= 2 || postalcode.length > 100 ||
            city === undefined || city === null || city.length <= 2 || city.length > 100 ||
            country === undefined || country === null || country.length <= 2 || country.length > 100) {
            throw new Error('Address, city, postalcode and country must be filled.')
        }
        this._address = address;
        this._postalcode = postalcode;
        this._city = city;
        this._country = country;
    }

    get address(): string {
        return this._address;
    }

    get postalcode(): string {
        return this._postalcode;
    }

    get city(): string {
        return this._city;
    }

    get country(): string {
        return this._country;
    }

    equals(object: Address): boolean {
        return this.address === object.address
            && this.postalcode === object.postalcode
            && this.city === object.city
            && this.country === object.country;
    }
}

Object.seal(Address);

