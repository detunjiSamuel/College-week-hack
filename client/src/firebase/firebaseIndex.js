/**
 * Initialize firebase authentication and firestore.
 */

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';

// firebase stuff
var firebaseConfig = {
  apiKey: "AIzaSyAbP-FqlkPx3L4BBNU1xfKLxzXm0uzfjoo",
  authDomain: "nmesoma-anene.firebaseapp.com",
  projectId: "nmesoma-anene",
  storageBucket: "nmesoma-anene.appspot.com",
  messagingSenderId: "940476573692",
  appId: "1:940476573692:web:68409a1a499ffeea217479"
};

firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
export const db=firebase.firestore();
export const fb=firebase;

export default { firebaseConfig }