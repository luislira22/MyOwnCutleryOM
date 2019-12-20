import FullnameDTO from "./FullnameDTO";
import DTO from "../../DTO";


export default interface OutputClientNameDTO extends DTO {
    id: string
    name: FullnameDTO
}
