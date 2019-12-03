import express = require("express");
import HeroRoutes = require("./../HeroRoutes");
import SpartanRoutes = require("./../SpartanRoutes");
import ClientRoutes = require("../ClientRoutes");
var app = express();
class BaseRoutes {
    
    get routes() {
        app.use("/", new HeroRoutes().routes);
        app.use("/", new SpartanRoutes().routes);
        app.use("/api", new ClientRoutes().routes)
        return app;
    }
}
export = BaseRoutes;
