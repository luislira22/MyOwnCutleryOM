import express = require("express");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
import AdminController = require("../../controllers/AdminController");
let router = express.Router();

class AdminRoutes {
    private readonly _adminController: AdminController;

    constructor() {
        this._adminController = new AdminController();
    }

    get routes() {
        let controller = this._adminController;
        router.post("/admins",controller.create);
        router.get("/admin/clients",AuthMiddlewares.checkAdminToken, controller.retrieve);
        router.get("/admin/client/:id?",AuthMiddlewares.checkAdminToken, controller.findById);
        return router;
    }
}

Object.seal(AdminRoutes);
export = AdminRoutes;
