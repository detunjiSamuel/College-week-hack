const express = require("express");
const router = express.Router();
const Deck = require("../models/Deck");
const { check, validationResult } = require("express-validator");

//. nb
/* Create Deck */
router.post(
  "/",
  check("title", "Title is required").notEmpty(),
  async (req, res, next) => {
    console.log("decks called");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.user;
    const { title, cards } = req.body;
    console.log(`title is ${title}`);
    try {
      deck = new Deck({
        user: id,
        title,
      });
      // if (cards) deck.cards = cards;
      if (cards) deck.cards = [];
      await deck.save();
      // nb
      console.log(`title : ${title}`);
      console.log(cards);
      res.json({ msg: `successfully add new deck ${title}` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// nb

/** Update Deck */
router.patch(
  "/",
  check("id", "Id is required").notEmpty(),
  (req, res, next) => {
    console.log("decks updating");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {id , cards , title } = req.body;
    

  }
);

module.exports = router;
