import { ValueObject } from '../../core/domain/ValueObject';


enum StatusMedia {
  Accepted = 'ACCEPTED',
  Processing = 'PROCESSING',
  Completed = 'COMPLETED'
}


interface StatusProperties {
  status: StatusMedia;
}

export class Status extends ValueObject<StatusProperties> {
  get value(): StatusMedia {
    return this.props.status;
  }

  constructor(props: StatusProperties) {
    super(props);
  }

  public static create(myStatus: StatusMedia): Status {
    if (
      myStatus.toString().localeCompare('ACCEPTED') != 0 ||
      myStatus.toString().localeCompare('PROCESSING') != 0 ||
      myStatus.toString().localeCompare('COMPLETED') != 0
    ) {
      throw new Error('Should have 1 valid status');
    } else {
      return new Status({ status: myStatus });
    }
  }

}


