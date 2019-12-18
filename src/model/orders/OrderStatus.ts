enum ValidStatus {
    Accepted = 'ACCEPTED',
    Processing = 'PROCESSING',
    Completed = 'COMPLETED',
    On_Hold = 'ON HOLD',
    Cancelled = 'CANCELLED'
}

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
        else if (status == null) throw  new Error('Status is null');
        else if (status === '') throw new Error('Status is empty');
        else
            throw new Error('Should have 1 valid status');
    }

    equals(object: Status): boolean {
        return this.status === object.status;
    }

}

Object.seal(Status);
