import DTO from "../DTO";
import PPClientDTO from "./PPClientDTO";
import PPOrderDTO from "./PPOrderDTO";


export default interface ProductionPlanningRequestDTO extends DTO {
    orders: PPOrderDTO[]
    clients: PPClientDTO[]
}
