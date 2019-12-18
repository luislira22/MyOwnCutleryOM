import DTO from "../DTO";


export default interface InputOrderDTO extends DTO {
    client: string
    quantity: number
    date: string
    deliveryDate: string
    status: string
    productID: string
}

