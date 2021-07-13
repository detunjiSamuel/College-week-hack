// nb

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const DeckSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  cards: [
    {
      id: {
        type: String,
        default: uuidv4(),
      },
      card_front: {
        type: String,
      },
      card_back: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("deck", DeckSchema);
