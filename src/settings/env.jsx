// import firebase from 'firebase'
import '@firebase/firestore' // 👈 Don't forget this!
import ReduxSagaFirebase from 'redux-saga-firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDAHm90kpj_GEX1Oh69JicM_koN-chARx8",
  authDomain: "planningpoker-7b96e.firebaseapp.com",
  projectId: "planningpoker-7b96e",
  storageBucket: "planningpoker-7b96e.appspot.com",
  messagingSenderId: "788451711448",
  appId: "1:788451711448:web:7553f054b1df57d93ebaad"
};
const cryptokey = '%1@b5HAo338$CabHn$g'
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

const rsf = new ReduxSagaFirebase(app)

export { rsf, db, cryptokey }
