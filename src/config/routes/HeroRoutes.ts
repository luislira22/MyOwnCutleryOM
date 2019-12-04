import express = require("express");
import HeroController = require("./../../controllers/HeroController");

var router = express.Router();

class HeroRoutes {
    private _heroController: HeroController;

    constructor() {
        this._heroController = new HeroController();
    }

    get routes() {
        var controller = this._heroController;
        router.get("/api/heroes", controller.retrieve);
        router.post("/api/heroes", controller.create);
        router.put("/api/heroes/:_id", controller.update);
        router.get("/api/heroes/:_id", controller.findById);
        router.delete("/api/heroes/:_id", controller.delete);

        return router;
    }


}

Object.seal(HeroRoutes);
export = HeroRoutes;
