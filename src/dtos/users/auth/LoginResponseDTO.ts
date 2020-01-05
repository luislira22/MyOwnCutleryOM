import ResponseDTO from "../../reponseDTO/ResponseDTO";
import UserDTO from "../UserDTO";

export default interface LoginResponseDTO extends ResponseDTO {
    user : UserDTO
    token:string;
    permissions:Object
}
