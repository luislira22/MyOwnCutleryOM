import SpartanModel = require("../model/Spartan");
import ISpartanModel = require("../model/interfaces/Spartan");
import SpartanSchema = require("./../dataAccess/schemas/SpartanSchema");
import RepositoryBase = require("./base/RepositoryBase");

class SpartanRepository  extends RepositoryBase<ISpartanModel> {
    constructor () {
        super(SpartanSchema);
    }
    
} 

Object.seal(SpartanRepository);
export = SpartanRepository;
