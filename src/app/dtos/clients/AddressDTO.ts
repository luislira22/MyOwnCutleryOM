import {DTO} from "../DTO";

export default interface AddressDTO extends DTO {
    address: string
    postalcode: string
    city: string
    country: string
}
