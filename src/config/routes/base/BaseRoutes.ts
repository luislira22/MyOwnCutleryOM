import express = require("express");
import Permissions from "../../middlewares/PermissionsMiddlewares";
import ClientRoutes = require("../ClientRoutes");
import AdminRoutes = require("../AdminRoutes");
import UserRoutes = require("../UserRoutes");
import permissionsHandler from "../../utils/permissionsHandler";

let app = express();

export class BaseRoutes {

    public static get routes() {

        app.use("/api/", new ClientRoutes().routes);
        app.use("/api/", new AdminRoutes().routes);
        app.use("/api/", new UserRoutes().routes);
        //app.use("/api/", new OrderRoutes().routes);
        return app;
    }
}

