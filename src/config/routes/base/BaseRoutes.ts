import express = require("express");
import ClientRoutes = require("../ClientRoutes");
import AdminRoutes = require("../AdminRoutes");
import UserRoutes = require("../UserRoutes");
let app = express();

export class BaseRoutes {
    
    public static get routes() {
        app.use("/api/", new ClientRoutes().routes);
        app.use("/api/",new AdminRoutes().routes);
        app.use("/api/",new UserRoutes().routes);
        //app.use("/api/", new OrderRoutes().routes);
        return app;
    }
}

