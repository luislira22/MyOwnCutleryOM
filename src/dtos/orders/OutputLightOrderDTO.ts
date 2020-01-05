import DTO from "../DTO";
import OutputClientDTO from "../users/clients/OutputClientDTO";
import OutputClientNameDTO from "../users/clients/OutputClientNameDTO";


export default interface OutputOrderDTO extends DTO {
    id: string
    client: OutputClientNameDTO
    quantity: number
    date: string
    requestDeliveryDate: string,
    deliveryDate: string
    status: string
    productID: string
}

