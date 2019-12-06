class Constants {
    //TODO mudar nome de datatbase e meter connection
    static MPD_API_URL: string ="https://masterdataproduct.azurewebsites.net/api/product/";
    static DB_CONNECTION_STRING: string  = "mongodb://localhost/moc"; 
}
Object.seal(Constants);
export = Constants;
