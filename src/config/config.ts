module.exports = {
    settings:{
        port: process.env.PORT || 5000,
        saltingRounds: 10,
    },
    permissions:{
        updateNameAndAddress:"client",
        getClient:"all",
        getAllClients:"all",
        createClient:"client",
        consultOrders:"client",
        updateOrder:"client",
        deleteClient:"client",
        cancelOrder:"all",
        createOrder:"client"
    }
};
