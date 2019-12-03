import { ValueObject } from '../../core/domain/ValueObject'

interface FullnameProperties {
	firstname: string
	lastname: string
}

export class Fullname extends ValueObject<FullnameProperties> {

	get firstname(): string {
		return this.props.firstname
	}

	get lastname(): string {
		return this.props.lastname
	}

	private constructor(props: FullnameProperties) {
		super(props)
	}

	public static create(firstname: string, lastname: string): Fullname {
		if (firstname === undefined || firstname === null || firstname.length <= 2 || firstname.length > 100 ||
			lastname === undefined || lastname === null || lastname.length <= 2 || lastname.length > 100) {
			throw new Error('Firstname and Lastname must be greater than 2 chars and less than 100.')
		}
		else {
			return new Fullname({ firstname: firstname, lastname: lastname })
		}
	}
}

