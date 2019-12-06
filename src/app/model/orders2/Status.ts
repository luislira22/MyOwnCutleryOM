import {ValidStatus} from "./enums/ValidStatus";

export default class Status implements ValueObject<Status> {

    private readonly _status: ValidStatus;

    get status(): ValidStatus {
        return this._status;
    }

    constructor(status: string) {
        if (status.toUpperCase() === "ACCEPTED") this._status = ValidStatus.Accepted;
        else if (status.toUpperCase() === "PROCESSING") this._status = ValidStatus.Processing;
        else if (status.toUpperCase() === "COMPLETED") this._status = ValidStatus.Completed;
        else if (status.toUpperCase() === "COMPLETED") this._status = ValidStatus.Completed;
        else if (status.toUpperCase() === "ON_HOLD") this._status = ValidStatus.On_Hold;
        else if (status.toUpperCase() === "CANCELLED") this._status = ValidStatus.Cancelled;
        else throw new Error('Should have 1 valid status');
    }

    equals(object: Status): boolean {
        return this.status === object.status;
    }

}

Object.seal(Status);

