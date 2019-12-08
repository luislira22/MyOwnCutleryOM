class Constants {
    //TODO mudar nome de datatbase e meter connection
    static MPD_API_URL: string ="https://masterdataproduct.azurewebsites.net/api/product/";
    //static DB_CONNECTION_STRING: string  = "mongodb://localhost/mod";
    static DB_CONNECTION_STRING: string  = "mongodb+srv://admin:admin@grupo029-dwhuv.gcp.mongodb.net/myowncutlery?retryWrites=true&w=majority";
}
Object.seal(Constants);
export = Constants;
