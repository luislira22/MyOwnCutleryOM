import express, { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'
import { CreateClientController } from '../../useCases/createClient/createClientController'
import { CreateClientUseCase } from '../../useCases/createClient/createClientUseCase'
import { ClientRepo } from '../../repositories/impl/ClientRepo'
import schema from '../../dataAccess/schemas/clientSchema'

const route = express.Router()

export default (app: Router) => {
    app.use('/clients', route)

    route.post('/', (request, response) => {
    })
    
    route.get('/', (request: Request, response: Response) => {
        return response.json('GET /api/clients').status(200)
    })
}

