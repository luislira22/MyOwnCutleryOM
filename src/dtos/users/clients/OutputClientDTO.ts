import DTO from "../../DTO";
import FullnameDTO from "./FullnameDTO";
import AddressDTO from "./AddressDTO";
import UserDTO from "../UserDTO";

export default interface OutputClientDTO extends UserDTO {
    name: FullnameDTO
    address: AddressDTO
    email: string
    nif: number
}
