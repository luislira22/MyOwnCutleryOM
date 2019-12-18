import DTO from "../DTO";
import OutputClientDTO from "../users/clients/OutputClientDTO";


export default interface OutputOrderDTO extends DTO {
    client: OutputClientDTO
    quantity: number
    date: string
    deliveryDate: string
    status: string
    productID: string
}

