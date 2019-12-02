import { ValueObject } from '../../core/domain/ValueObject'

interface AddressProperties {
    value: string
}

export class Address extends ValueObject<AddressProperties> {

    get value(): string {
        return this.props.value
    }

    private constructor(props: AddressProperties) {
        super(props)
    }

    public static create(address: string, postalcode: string, city: string, country: string): Address {
        if (
            address === undefined ||
            address === null ||
            address.length <= 2 ||
            address.length > 100 ||
            city === undefined || city === null || city.length <= 2 || city.length > 100 ||
            postalcode === undefined || postalcode === null || postalcode.length <= 2 || postalcode.length > 100 ||
            country === undefined || country === null || country.length <= 2 || country.length > 100) {
            throw new Error('Address, city, postalcode and country must be filled.')
        }
        else {
            let fullAddress = address + ', ' + postalcode + ', ' + city + ', ' + country
            return new Address({ value: fullAddress })
        }
    }
}

