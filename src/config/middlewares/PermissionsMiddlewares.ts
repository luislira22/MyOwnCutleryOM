import permissionsHandler from "../utils/permissionsHandler";

export default class Permissions{
    public static updatePermissions(req,res,next){
        permissionsHandler.updatePermissions();
        next();
    }
}
