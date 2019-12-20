import express = require("express");

//SERVICE
import UserService = require("../services/users/UserService");
//DTO
import UserLoginDTO from "../dtos/users/auth/UserLoginDTO";
import ResponseDTOError from "../dtos/reponseDTO/ResponseDTOError";

class UserController {

    public async login(req: express.Request, res: express.Response): Promise<void> {
        try {
            let userLoginDto: UserLoginDTO = <UserLoginDTO>req.body;
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
