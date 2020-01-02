module.exports = {
    settings:{
        port: process.env.PORT || 5000,
        saltingRounds: 10,
    },
    permissions:{
        updateNameAndAddress:"client",
        getClient:"all",
        getAllClients:"admin",
        updateOrder:"client",
        deleteClient:"client",
        cancelOrder:"all",
    }
};
