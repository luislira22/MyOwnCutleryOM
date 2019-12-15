import IFullnameDTO from "../users/clients/FullnameDTO"
import IAddressDTO from "../users/clients/AddressDTO"
import DTO from "../DTO";

export default interface ClientDTO extends DTO {
    id: string
    name: IFullnameDTO
    address: IAddressDTO
    email: string
    password: string
    nif: number
    role: string
}


