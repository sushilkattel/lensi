import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc
  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

const registerUser = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      time: 0,
      type: 0,
      start: 0,
      end: 0,
      used: 0
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
const authUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const logout = () => {
    signOut(auth);
  };


  const getData = async () => {
    console.log("DATA CALLED")
    try { 
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) 
    { 
      const qUser = docSnap.data();
      return qUser
    }
     else {
       console.log("Document does not exist") ;
       return(404);
      } } 
      catch(error) { console.log(error); return(404) }
  }
  const setStartData = async () => {
    try {
      const current = new Date().getTime();;
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      console.log("CURRENT: ", current);
      const data = {
        start: current
      }
      setDoc(docRef, data, {merge: true});
      //const docSnap = await setDoc(docRef, {start: startTime})
    } catch(error) {console.log(error); return(404)}

  }
  const setEndData = async () => {
    try {
      const userData = await getData();
      const end = new Date().getTime();;
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const currUsed = end - userData.start
      console.log("CURR USED: ",currUsed)
      const used = userData.used + currUsed


      const data = {
        start: 0,
        end: 0,
        used: await used
      }
      await setDoc(docRef, data, {merge: true});

      //const docSnap = await setDoc(docRef, {start: startTime})
    } catch(error) {console.log(error); return(404)}

  }
//returns current user
const currentUser = auth.currentUser;

const newLens = async function (str) {
  console.log("NEW LENS CALLED")
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);

      const data = {
        start: 0,
        end: 0,
        used: 0,
        remaining: 0,
        time: 0,
        type: str
      }
      await setDoc(docRef, data, {merge: true});
      return null
    } catch (error) {
      {console.log(error); return(404)}
    }
    
  }

// Initialize Firebase
export {
    auth,
    registerUser,
    authUser,
    logout,
    db,
    getData,
    setStartData,
    setEndData,
    newLens,
    currentUser
}