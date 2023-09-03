const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  imageurl: String,
  heading: String,
  isRating: Boolean,
  money: String,
  btnContent: String,
},
{ collection: "card" }
);

module.exports = mongoose.model("card", cardSchema);