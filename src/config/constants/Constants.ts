class Constants {
    //TODO mudar nome de datatbase e meter connection
    static DB_CONNECTION_STRING: string  = "mongodb://localhost/warriors";

    static MPD_API_URL: string ="https://masterdataproduct.azurewebsites.net/api/product/";
}
Object.seal(Constants);
export = Constants;
