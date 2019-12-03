import { ValueObject } from '../../core/domain/ValueObject'

interface EmailProperties {
  email: string;
}

export class Email extends ValueObject<EmailProperties> {
  get email(): string {
    return this.props.email;
  }

  private constructor(props: EmailProperties) {
    super(props);
  }

  public static create(email: string): Email {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email does not match email patterns.');
    } else {
      return new Email({ email: email });
    }
  }
}
