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
        let clientPermissions = configs.permissions.clients;
        let adminPermissions = configs.permissions.admins;
        let universalPermissions = configs.permissions.universal;
        //create Object with all the permissions available and not available for the role

        for(let name in adminPermissions){
            if(role == "admin") permissionsDTO[name] = adminPermissions[name];
            else permissionsDTO[name] = false;
        }
        for(let name in clientPermissions){
            if(role == "client") permissionsDTO[name] = clientPermissions[name];
            else permissionsDTO[name] = false;
        }
        for(let name in universalPermissions){
            let permissionRole : string = universalPermissions[name];
            if(permissionRole === "all" || permissionRole === role)
                permissionsDTO[name] = true;
            else
                permissionsDTO[name] = false;
        }
        return permissionsDTO;
    }
}
