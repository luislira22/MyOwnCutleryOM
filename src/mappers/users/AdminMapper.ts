import * as mongoose from "mongoose";
import Email from "../../model/user/Email";
import IClientModel from "../../dataAccess/schemas/users/interfaces/clients/IClientModel";
import Admin from "../../model/user/admin/Admin";
import IAdminModel from "../../dataAccess/schemas/users/interfaces/admins/IAdminModel";
import InputAdminDTO from "../../dtos/users/admins/InputAdminDTO";
import OutputAdminDTO from "../../dtos/users/admins/OutputAdminDTO";

export default class AdminMapper {

    public static fromDomainToPersistence(admin: Admin): mongoose.Model<IAdminModel> {
        return ({
            //@ts-ignore
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

    public static fromDTOToDomain(adminDTO : InputAdminDTO){
        return new Admin(
            new Email(adminDTO.email),
            adminDTO.password
        )
    }

    public static fromDomainToDTO(admin : Admin) :OutputAdminDTO{
        return({
            email : admin.email.email
        });
    }
}
