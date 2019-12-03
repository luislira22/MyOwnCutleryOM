import mongoose = require("mongoose");

interface Spartan extends mongoose.Document {
    folk: string;
    amountPeopleKilled: number;
    name: string;
}

export = Spartan;
