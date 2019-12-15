import express = require("express");
import ClientRoutes = require("../ClientRoutes");
import OrderRoutes = require("../OrderRoute");
let app = express();

export class BaseRoutes {
    
    public static get routes() {
        app.use("/api/", new ClientRoutes().routes);
        app.use("/api/", new OrderRoutes().routes);

        return app;
    }
}

