import DTO from "../../DTO";

export default interface UserLoginDTO extends DTO {
    email: string
    password: string
}
