import UserRepository from "../../repository/UserRepository";
import User from "../../model/user/User";
import ResponseDTO from "../../dtos/reponseDTO/ResponseDTO";
import LoginResponseDTO from "../../dtos/users/auth/LoginResponseDTO";
import permissionsHandler from "../../config/utils/permissionsHandler";

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

                    let responseDTO: LoginResponseDTO = {
                        success: true,
                        message: "Login successful",
                        token: token,
                        permissions:permissionsHandler.createPermissionsResponse(role)
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
}

Object.seal(UserService);
export = UserService;
