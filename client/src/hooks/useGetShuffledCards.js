/**
 * Hook which subscribes to the collection of cards in the
 * firestore database.
 */

import { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';
const useGetShuffledCards = (user, deckIds, holder) => {
  const db = firebase.firestore();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!user) {
      setCards([]);
      return;
    }

    if (deckIds.length === 0) {
      setCards([]);
      return;
    }

    let ref = db.collection('cards');
    let unsubscribe = ref.where('deckId', 'in', deckIds).onSnapshot(
      (snapshot) => {
        let arr = [];
        for (let i of holder) {
          axios
            .get(
              `https://opentdb.com/api.php?amount=10&category=${i}&type=multiple`
            )
            .then((res) => {
              const { data } = res;
              const { results } = data;
              console.log(results);

              for (let result of results) {
                arr.push({
                  front: result.question,
                  owner: user.uid,
                  back: result.correct_answer,
                  deckId: `P${results.category}${user.uid}`,
                });
              }
            }).catch(e=> console.log(e.value));
          snapshot.forEach((card) => arr.push(card.data()));
        }
        setCards(arr);
        /* console.log("Cards updated: ", arr) */
      },
      (error) => {
        console.log('Error: ', error.message);
      }
    );
    return () => unsubscribe();
  }, [user, deckIds]);

  return { cards };
};

export default useGetShuffledCards;
