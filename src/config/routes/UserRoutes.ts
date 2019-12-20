import express = require("express");
import UserController = require("../../controllers/UserController");

let router = express.Router();

class UserRoutes {
    private readonly _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }

    get routes() {
        let controller = this._userController;
        //auth user
        router.post("/login", controller.login);
        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;
