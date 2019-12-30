import DTO from "../DTO";
import OutputClientDTO from "../users/clients/OutputClientDTO";
import OutputClientNameDTO from "../users/clients/OutputClientNameDTO";


export default interface OutputOrderDTO extends DTO {
    id: string
    client: OutputClientNameDTO
    quantity: number
    date: Date
    requestDeliveryDate: Date,
    deliveryDate: Date
    status: string
    productID: string
}

