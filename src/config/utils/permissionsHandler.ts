'use strict';
import DTO from "../../dtos/DTO";

const configs = require('../config');

const fs = require('fs');

export default class permissionsHandler {
    public static updatePermissions() : void{
        let rawData = fs.readFileSync("permissions.json");
        console.log("updating permissions!");
        configs.permissions = JSON.parse(rawData);
    }
    public static createPermissionsResponse(role: string){
        let permissionsDTO =  {};
        //MDP / MDF only available for admin
        if(role === "admin")
            permissionsDTO["MDFP"] = true;
        else
            permissionsDTO["MDFP"] = false;
        //create Object with all the permissions available and not available for the role
        for(let name in configs.permissions){
            let permissionRole : string = configs.permissions[name];
            if(permissionRole === "all" || permissionRole === role)
                permissionsDTO[name] = true;
            else
                permissionsDTO[name] = false;
        }
        return permissionsDTO;
    }
}
