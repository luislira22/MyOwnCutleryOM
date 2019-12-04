import SpartanRepository = require("./../repository/SpartanRepository");
import IOrderService = require("./interfaces/OrderService");
import ISpartanModel = require("../model/interfaces/Spartan");
//TODO acertar e fazer
class OrderService  implements IOrderService {
    private _orderRepository: OrderRepository;

    constructor () {
        this._spartanRepository = new SpartanRepository();
    }

    create (item: ISpartanModel, callback: (error: any, result: any) => void) {
        this._spartanRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._spartanRepository.retrieve(callback);
    }

    update (_id: string, item: ISpartanModel, callback: (error: any, result: any) => void) {
        this._spartanRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);
            else
                this._spartanRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._spartanRepository.delete(_id, callback);
    }

    findById (_id: string, callback: (error: any, result: ISpartanModel) => void) {
        this._spartanRepository.findById(_id, callback);
    }

}
Object.seal(SpartanService);
export = SpartanService;
