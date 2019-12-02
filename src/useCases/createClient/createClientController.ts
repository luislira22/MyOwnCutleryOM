import { BaseController } from '../../core/infra/BaseController'
import { CreateClientUseCase } from './createClientUseCase';
import { CreateClientDTO } from './createClientDTO';
import { CreateClientErrors } from './createClientErrors';

export class CreateClientController extends BaseController {
    private useCase: CreateClientUseCase

    constructor(useCase: CreateClientUseCase) {
        super()
        this.useCase = useCase
    }

    async executeImpl(): Promise<any> {
        const dto: CreateClientDTO = this.req.body as CreateClientDTO

        try {
            const result = await this.useCase.execute(dto)

            if (result.isLeft()) {
                const error = result.value

                switch (error.constructor) {
                    case CreateClientErrors.AccountAlreadyExists:
                        return this.conflict(error.errorValue().message)
                    default:
                        return this.fail(error.errorValue().message)
                }
            }
            else {
                return this.ok(this.res)
            }
        }
        catch (err) {
            return this.fail(err)
        }
    }

}