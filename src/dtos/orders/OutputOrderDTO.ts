import DTO from "../DTO";
import OutputClientDTO from "../users/clients/OutputClientDTO";


export default interface OutputOrderDTO extends DTO {
    id: string
    client: OutputClientDTO
    quantity: number
    date: string
    requestDeliveryDate: string,
    deliveryDate: string
    status: string
    productID: string
}

