import express = require("express");
import HeroRoutes = require("./../HeroRoutes");
import SpartanRoutes = require("./../SpartanRoutes");
import ClientRoutes = require("../ClientRoutes");
import OrderRoutes = require("../OrderRoute");
var app = express();
class BaseRoutes {
    
    get routes() {
        app.use("/", new HeroRoutes().routes);
        app.use("/", new SpartanRoutes().routes);
        app.use("/api/", new ClientRoutes().routes);
        app.use("/api/", new OrderRoutes().routes);

        return app;
    }
}
export = BaseRoutes;
