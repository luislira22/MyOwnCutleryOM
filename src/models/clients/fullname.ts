import { ValueObject } from '../ValueObject'

interface FullnameProperties {
  value: string;
}

export class Fullname extends ValueObject<FullnameProperties> {
  get value(): string {
    return this.props.value;
  }

  // Can't use the 'new' keyword from outside the scope of the class.
  private constructor(props: FullnameProperties) {
    super(props);
  }

    private constructor(props: FullnameProperties) {
        super(props)
    }
  }
}
