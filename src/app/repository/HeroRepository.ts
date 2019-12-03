import HeroModel = require("../model/Hero");
import IHeroModel = require("../model/interfaces/Hero");
import HeroSchema = require("./../dataAccess/schemas/HeroSchema");
import RepositoryBase = require("./base/RepositoryBase");

class HeroRepository  extends RepositoryBase<IHeroModel> {
    constructor () {
        super(HeroSchema);
    }    
} 

Object.seal(HeroRepository);
export = HeroRepository;
