import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBbZ3vpE-g_LpLW-QDwxi0Upy8Bapp4njs",
    authDomain: "curso-2ff4a.firebaseapp.com",
    projectId: "curso-2ff4a",
    storageBucket: "curso-2ff4a.appspot.com",
    messagingSenderId: "184967482103",
    appId: "1:184967482103:web:44a57375655331ae2ce1f2",
    measurementId: "G-TTRKYW9FK2"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export { db, auth }