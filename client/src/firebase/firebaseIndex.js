/**
 * Initialize firebase authentication and firestore.
 */

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';

// firebase stuff
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
export const db=firebase.firestore();
export const fb=firebase;

export default { firebaseConfig }