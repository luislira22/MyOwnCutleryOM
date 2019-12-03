import { BaseController } from '../core/infra/BaseController'
import { CreateClientController } from '../useCases/createClient/createClientController'
import { CreateClientUseCase } from '../useCases/createClient/createClientUseCase'
import { ClientRepo } from '../repositories/impl/ClientRepo'
import { model } from 'mongoose'
import { schema } from '../dataAccess/schemas/clientSchema'

export class CreateClient {

}