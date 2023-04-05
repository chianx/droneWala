import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/firestore';
import {getStorage} from 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyAtArbKObLRKeBEezoCDmslzJ0m5FlvGoM",
  authDomain: "droneswala-bce4b.firebaseapp.com",
  projectId: "droneswala-bce4b",
  storageBucket: "droneswala-bce4b.appspot.com",
  messagingSenderId: "612143726406",
  appId: "1:612143726406:web:50705e5e46d6bd8d45ef47",
  measurementId: "G-JHVQEK46JM"
};

// Initialize Firebase
// if(firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // export const storage = getStorage(firebaseConfig)
// }
