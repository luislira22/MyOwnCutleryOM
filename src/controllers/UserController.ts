import express = require("express");

//SERVICE
import UserService = require("../services/users/UserService");
//DTO
import LoginRequestDTO from "../dtos/users/auth/LoginRequestDTO";
import ResponseDTOError from "../dtos/reponseDTO/ResponseDTOError";
import ClientMapper from "../mappers/users/ClientMapper";

class UserController {

    public async login(req: express.Request, res: express.Response): Promise<void> {
        try {
            let userLoginDto: LoginRequestDTO = <LoginRequestDTO>req.body;
            console.log(userLoginDto);
            let userService = new UserService();
            await userService.login(userLoginDto.email,userLoginDto.password).then(value => {
                res.status(200).send(value);
            }).catch(value => {
                let responseDTO : ResponseDTOError = {
                    success:false,
                    message: "error occurred",
                    error:value
                };
                res.status(400).send(responseDTO);
            });
        } catch (e) {
            //Internal server error
            let responseDTO : ResponseDTOError = {
                success:false,
                message: "internal error occurred",
                error:e
            };
            res.status(500).send(responseDTO);
        }
    }
}

export = UserController;
