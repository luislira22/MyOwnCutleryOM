import DTO from "../DTO";
import PPOrderTimeDTO from "./PPOrderTimeDTO";



export default interface ProductionPlanningResponseDTO extends DTO {
    orderList: PPOrderTimeDTO[]
}
