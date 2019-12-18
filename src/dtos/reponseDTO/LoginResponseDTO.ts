import ResponseDTO from "./ResponseDTO";

export default interface LoginResponseDTO extends ResponseDTO {
    token:string;
}
