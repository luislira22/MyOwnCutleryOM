import IStatus from '../../dataAccess/schemas/orders/interfaces/Status';
import {ValidStatus} from "./enums/ValidStatus";

export default class Status implements ValueObject<Status> {

    private _status: IStatus;

    get status(): ValidStatus {
        return this._status.status
    }

    private constructor(status: IStatus) {
        if (
            status.status != ValidStatus.Accepted &&
            status.status != ValidStatus.Processing &&
            status.status != ValidStatus.Completed &&
            status.status != ValidStatus.On_Hold &&
            status.status != ValidStatus.Cancelled
        ) {
            throw new Error('Should have 1 valid status');
        } else if (status.status === undefined) {
            throw new Error('Status undefined');
        } else {
            this._status = status
        }
    }

    equals(object: Status): boolean {
        return this.status === object.status;
    }

}

Object.seal(Status);

