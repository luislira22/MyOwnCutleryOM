import * as mongoose from "mongoose";
import Email from "../../model/user/Email";
import IClientModel from "../../dataAccess/schemas/users/interfaces/clients/IClientModel";
import Admin from "../../model/user/admin/Admin";
import IAdminModel from "../../dataAccess/schemas/users/interfaces/admins/IAdminModel";

export default class AdminMapper {

    public static fromDomainToPersistence(admin: Admin): mongoose.Model<IAdminModel> {
        return ({
            // @ts-ignore
            email: admin.email.email,
            password: admin.password,
        });
    }

    public static fromPersistenceToDomain(adminModel: IAdminModel): Admin {
        return new Admin(
            new Email(adminModel.email),
            adminModel.password,
            adminModel.role,
            adminModel.id,
        );
    }
}
