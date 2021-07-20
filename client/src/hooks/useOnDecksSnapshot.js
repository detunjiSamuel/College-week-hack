/**
 * Hook grabbing the current user's owned decks from firestore.
 */

import { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';

const useOnDecksSnapshot = (user, holder) => {
  const db = firebase.firestore();
  const [decks, setDecks] = useState([]);

  // Get decks from collection where owner is the current user.
  useEffect(() => {
    if (!user) {
      setDecks([]);
      return;
    }

    let ref = db.collection('decks');
    let unsubscribe = ref.where('owner', '==', user.uid).onSnapshot(
      (snapshot) => {
        let arr = [];
        for (let i of holder) {
          console.log('here');
          axios
            .get(
              `https://opentdb.com/api.php?amount=10&category=${i}&type=multiple`
            )
            .then((res) => {
              const { data } = res;
              const { results } = data;
              const { category } = results[0];
              arr.push({
                title: category,
                owner: user.uid,
                private: false,
                numCards: 3,
                id: `P${category}${user.uid}`,
              });
            });
        }
        snapshot.forEach((deck) => arr.push(deck.data()));
        console.log(arr);
        setDecks(arr);
        /* console.log("Deck data updated: ", arr); */
      },
      (error) => console.log('Error: ', error.message)
    );

    return () => unsubscribe();
  }, [user]);

  return { decks };
};

export default useOnDecksSnapshot;
