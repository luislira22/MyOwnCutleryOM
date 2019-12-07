import DTO from "../DTO";

interface ClientLoginDTO extends DTO {
    email: string
    password: string
}

export default ClientLoginDTO
