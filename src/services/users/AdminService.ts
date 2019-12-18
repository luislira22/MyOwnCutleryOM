//DOMAIN
//REPOSITORY
import UserRepository from "../../repository/UserRepository";
import Admin from "../../model/user/admin/Admin";
//PERSISTENCE MODELS
const ClientModel = require("../../dataAccess/schemas/users/ClientSchema");
const UserModel = require("../../dataAccess/schemas/users/UserSchema");
const AdminModel = require("../../dataAccess/schemas/users/AdminSchema");

//CONFIGS
const config = require("../../config/config");


class AdminService {
    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository(ClientModel, AdminModel, UserModel);
    }

    async create(admin : Admin): Promise<Admin> {
        return await this._userRepository.create(admin);
    }
}

Object.seal(AdminService);
export = AdminService;
