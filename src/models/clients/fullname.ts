import { ValueObject } from '../valueObject'

interface FullnameProperties {
    value: string
}

export class Fullname extends ValueObject<FullnameProperties> {

    get value(): string {
        return this.props.value
    }

    // Can't use the 'new' keyword from outside the scope of the class.
    private constructor(props: FullnameProperties) {
        super(props)
    }

    public static create(firstname: string, lastname: string): Fullname {
        if (firstname === undefined || firstname === null || firstname.length <= 2 || firstname.length > 100 ||
            lastname === undefined || lastname === null || lastname.length <= 2 || lastname.length > 100) {
            throw new Error('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
        else {
            let name = firstname + ' ' + lastname
            return new Fullname({ value: name })
        }
    }
}

