import DTO from "../../DTO";
import FullnameDTO from "./FullnameDTO";
import AddressDTO from "./AddressDTO";

export default interface InputClientDTO extends DTO {
    name: FullnameDTO
    address: AddressDTO
    email: string
    password: string
    nif: number
}
