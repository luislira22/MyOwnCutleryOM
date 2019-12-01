import { AggregateRoot } from '../AggregateRoot'
import { UniqueEntityID } from '../UniqueEntityID'
import { Guard } from '../logic/Guard'
import { Email } from './email'
import { Fullname } from './fullname'
import { Result } from '../logic/Result'
import { Address } from './address'

interface ClientProperties {
    email: Email
    fullname: Fullname
    password: string
    address: Address
    //id
}

export class Client extends AggregateRoot<ClientProperties> {

    get id(): UniqueEntityID {
        return this._id
    }

    get address(): Address {
        return this.props.address
    }

    get email(): Email {
        return this.props.email
    }

    get fullname(): Fullname {
        return this.props.fullname
    }

    private constructor(props: ClientProperties, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: ClientProperties, id?: UniqueEntityID) {
        const guardedProps = [
            { argument: props.email, argumentName: 'email' },
            { argument: props.fullname, argumentName: 'fullname' },
            { argument: props.address, argumentName: 'address' },
            { argument: props.password, argumentName: 'password' },
        ]

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

        if (!guardResult.succeeded) {
            return Result.fail<Client>(guardResult.message)
        }
        else {
            const client = new Client({
                ...props,
                email: props.email,
                fullname: props.fullname,
                address: props.address,
                password: props.password,
            }, id)

            //TODO Generate Id

            return Result.ok<Client>(client);
        }
    }
}
