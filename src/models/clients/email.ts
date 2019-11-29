import { ValueObject } from '../valueObject';

interface EmailProperties {
  value: string;
}

export class Email extends ValueObject<EmailProperties> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: EmailProperties) {
    super(props);
  }

  public static create(email: string): Email {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email does not match email patterns.');
    } else {
      return new Email({ value: email });
    }
  }
}
