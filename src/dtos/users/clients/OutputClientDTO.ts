import DTO from "../../DTO";
import FullnameDTO from "./FullnameDTO";
import AddressDTO from "./AddressDTO";

export default interface OutputClientDTO extends DTO {
    name: FullnameDTO
    address: AddressDTO
    email: string
    nif: number
    priority: number
}
