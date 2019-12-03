import mongoose = require("mongoose");

interface Hero extends mongoose.Document {
  power: string;
  amountPeopleSaved: number;
  name: string;
}

export = Hero;
