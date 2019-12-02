import { ValueObject } from '../../core/domain/ValueObject';

export enum StatusMedia {
  Accepted = 'ACCEPTED',
  Processing = 'PROCESSING',
  Completed = 'COMPLETED'
}

interface StatusProperties {
  status: string;
}

export class Status extends ValueObject<StatusProperties> {
  get value(): string {
    return this.props.status;
  }

  constructor(props: StatusProperties) {
    super(props);
  }

  public static create(myStatus: string): Status {
    if (
      myStatus != StatusMedia.Accepted && myStatus != StatusMedia.Processing && myStatus != StatusMedia.Completed
    ) {
      throw new Error('Should have 1 valid status');
    } else if (myStatus === undefined) {
      throw new Error('Status undefined');
    } else {
      return new Status({ status: myStatus });
    }
  }

}


