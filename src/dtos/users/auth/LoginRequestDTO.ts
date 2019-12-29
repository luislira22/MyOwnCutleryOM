import DTO from "../../DTO";

export default interface LoginRequestDTO extends DTO {
    email: string
    password: string
}
