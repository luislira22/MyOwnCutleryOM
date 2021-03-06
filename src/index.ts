import Permissions from "./config/middlewares/PermissionsMiddlewares";
require('dotenv').config();
import {BaseRoutes} from "./config/routes/base/BaseRoutes";
import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

const config = require("./config/config");

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(Permissions.updatePermissions,BaseRoutes.routes);

let port = config.settings.port;
app.set("port", port);


app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});
