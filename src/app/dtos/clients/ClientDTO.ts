import IFullnameDTO from "./FullnameDTO"
import IAddressDTO from "./AddressDTO"
import IEmailDTO from "./EmailDTO"
import {DTO} from "../DTO";

interface ClientDTO extends DTO {
    id: string
    name: IFullnameDTO
    address: IAddressDTO
    email: string
    password: string
}

export = ClientDTO
