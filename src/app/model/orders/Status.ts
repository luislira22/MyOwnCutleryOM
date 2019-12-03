import IStatus = require('./interfaces/Status');
import {ValidStatus} from "./enums/ValidStatus";

class Status {

    private _status: IStatus;

    get status(): ValidStatus {
        return this._status.status
    }

    private constructor(status: IStatus) {
        if (
            status.status != ValidStatus.Accepted &&
            status.status != ValidStatus.Processing &&
            status.status != ValidStatus.Completed
        ) {
            throw new Error('Should have 1 valid status');
        } else if (status.status === undefined) {
            throw new Error('Status undefined');
        } else {
            this._status = status
        }
    }

}

Object.seal(Status);
export = Status;

