import { UseCase } from "../../core/domain/UseCase"
import { CreateClientDTO } from "./createClientDTO"
import { Either, Result, left, right } from "../../core/logic/Result"
import { IClientRepo } from "../../repositories/interfaces/IClientRepo"
import { CreateClientErrors } from "./createClientErrors"
import { GenericAppError } from "../../core/logic/AppError"
import { Client } from "../../models/clients/client"
import { Email } from "../../models/clients/email"
import { Address } from "../../models/clients/address"
import { Fullname } from "../../models/clients/fullname"

type Response = Either<
    GenericAppError.UnexpectedError |
    CreateClientErrors.AccountAlreadyExists |
    Result<any>,
    Result<void>
>

export class CreateClientUseCase implements UseCase<CreateClientDTO, Promise<Response>> {
    private clientRepo: IClientRepo;

    constructor(clientRepo: IClientRepo) {
        this.clientRepo = clientRepo;
    }

    async execute(request: CreateClientDTO): Promise<Response> {

        const fullname = Fullname.create(request.firstname, request.lastname)
        const email = Email.create(request.email)
        const password = request.password
        const address = Address.create(request.address, request.postalcode, request.city, request.country)

        const clientOrError = Client.create({
            'address': address,
            'email': email,
            'fullname': fullname,
            'password': password,
        })

        if (clientOrError.isFailure) {
            return left(Result.fail<void>(Error)) as Response
        }

        const client: Client = clientOrError.getValue()
        const clientAlreadyExists = await this.clientRepo.exists(client.email)

        if (clientAlreadyExists) {
            return left(new CreateClientErrors.AccountAlreadyExists(client.email.value)) as Response;
        }

        try {
            await this.clientRepo.save(client)
        } catch (err) {
            return left(new GenericAppError.UnexpectedError(err)) as Response;
        }

        return right(Result.ok<void>()) as Response;
        /*const { firstName, lastName } = req;
    
        const emailOrError = UserEmail.create(req.email);
        const passwordOrError = UserPassword.create({ value: req.password });
    
        const combinedPropsResult = Result.combine([ emailOrError, passwordOrError ]);
    
        if (combinedPropsResult.isFailure) {
          return left(Result.fail<void>(combinedPropsResult.error)) as Response;
        }
    
        const userOrError = User.create({ 
          email: emailOrError.getValue(), 
          password: passwordOrError.getValue(), 
          firstName, 
          lastName,
          isEmailVerified: false
        });
    
        if (userOrError.isFailure) {
          return left(Result.fail<void>(combinedPropsResult.error)) as Response;
        }
    
        const user: User = userOrError.getValue();
    
        const userAlreadyExists = await this.userRepo.exists(user.email);
    
        if (userAlreadyExists) {
          return left(new CreateUserErrors.AccountAlreadyExists(user.email.value)) as Response;
        }
    
        try {
          await this.userRepo.save(user);
        } catch (err) {
          return left(new GenericAppError.UnexpectedError(err)) as Response;
        }
    
        return right(Result.ok<void>()) as Response;*/
    }
}