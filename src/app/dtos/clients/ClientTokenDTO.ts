import DTO from "../DTO";


export interface ClientTokenDTO extends DTO{
    success :boolean
    message:string
}

export interface ClientTokenDTOTrue extends ClientTokenDTO {
    success: boolean
    message:string
    token: string
}

export interface ClientTokenDTOFalse extends ClientTokenDTO {
    success: boolean
    message:string
}

