import UserRepository from "../../repository/UserRepository";
import User from "../../model/user/User";
import ResponseDTO from "../../dtos/reponseDTO/ResponseDTO";
import LoginResponseDTO from "../../dtos/users/auth/LoginResponseDTO";
import permissionsHandler from "../../config/utils/permissionsHandler";
import Client from "../../model/user/client/Client";
import UserDTO from "../../dtos/users/UserDTO";
import ClientMapper from "../../mappers/users/ClientMapper";
import Admin from "../../model/user/admin/Admin";
import AdminMapper from "../../mappers/users/AdminMapper";

const ClientModel = require("../../dataAccess/schemas/users/ClientSchema");
const UserModel = require("../../dataAccess/schemas/users/UserSchema");
const AdminModel = require("../../dataAccess/schemas/users/AdminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {

    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository(ClientModel, AdminModel, UserModel);
    }

    public async login(email: string, insertedPassword: string): Promise<ResponseDTO> {
        let user: User = await this._userRepository.findByEmail(email).then((result: User) => {
            return result;
        }).catch((error) => {
            throw error;
        });
        if (user == null) {
            let responseDTO: ResponseDTO = {
                success: false,
                message: "email not found"
            };
            return responseDTO;
        } else {
            return await bcrypt.compare(insertedPassword, user.password).then((match: boolean) => {
                if (match) {
                    let role = user.role;
                    const payload = {
                        id: user._id,
                        role: user.role
                    };
                    const options = {expiresIn: '1d'};
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    let userDTO : UserDTO;
                    if(user instanceof Client){
                        userDTO = ClientMapper.fromDomainToDTO(<Client>user);
                    }else if(user instanceof Admin){
                        userDTO = AdminMapper.fromDomainToDTO(<Admin> user);
                    }
                    let permissions = permissionsHandler.createPermissionsResponse(role);
                    let responseDTO: LoginResponseDTO = {
                        user:userDTO,
                        success: true,
                        message: "Login successful",
                        token: token,
                        permissions:permissions
                    };
                    return responseDTO
                } else {
                    let responseDTO: ResponseDTO = {
                        success: false,
                        message: "password does not match"
                    };
                    return responseDTO;
                }
            }).catch((error) =>{
                throw error;
            });
        }
    }

    async findById(id: string): Promise<User> {
        return await this._userRepository.findOne(id);
    }
}

Object.seal(UserService);
export = UserService;
