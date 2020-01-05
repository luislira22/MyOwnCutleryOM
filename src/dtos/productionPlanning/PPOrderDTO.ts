import DTO from "../DTO";


export default interface PPOrderDTO extends DTO {
    orderId : string,
    productId: string,
    clientId : string,
    quantity: number,
    conclusionTime: number
}
