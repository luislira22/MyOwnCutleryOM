import {DTO} from "../DTO";
import ClientDTO from "../clients/ClientDTO";
import StatusDTO from "./StatusDTO";
import DateDTO from "./DateDTO";
import QuantityDTO from "./QuantityDTO";

export default interface OrderDTO extends DTO {
    client: ClientDTO
    quantity: number
    date: Date
    status: string
    productID: string
}

