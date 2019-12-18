import DTO from "../DTO";

export default interface ResponseDTOSuccess extends DTO {
    success: boolean
    message: string
}
