import {DTO} from "../DTO";
import ClientDTO = require("../clients/ClientDTO");
import StatusDTO from "./StatusDTO";
import DateDTO from "./DateDTO";
import QuantityDTO from "./QuantityDTO";

interface OrderDTO extends DTO {
    client: string
    quantity: number
    date: Date
    status: string
}

export = OrderDTO
