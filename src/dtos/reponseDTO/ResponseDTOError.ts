import ResponseDTO from "./ResponseDTO";

export default interface ResponseDTOError extends ResponseDTO {
    error: Error
}
