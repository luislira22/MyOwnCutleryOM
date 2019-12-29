import ResponseDTO from "../../reponseDTO/ResponseDTO";

export default interface LoginResponseDTO extends ResponseDTO {
    token:string;
    permissions:Object
}
