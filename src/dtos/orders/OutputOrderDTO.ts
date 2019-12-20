import DTO from "../DTO";
import OutputClientDTO from "../users/clients/OutputClientDTO";


export default interface OutputOrderDTO extends DTO {
    id: string
    client: OutputClientDTO
    quantity: number
    date: Date
    requestDeliveryDate: Date,
    deliveryDate: Date
    status: string
    productID: string
}

