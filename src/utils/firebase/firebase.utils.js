// celi ovaj fajl je unikatan tip konfiguracije koji google zahteva za signin formu
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg-l0EiSiSc78-UA49AJH2Wape0CN30RY",
    authDomain: "crwn-clothing-db-87870.firebaseapp.com",
    projectId: "crwn-clothing-db-87870",
    storageBucket: "crwn-clothing-db-87870.firebasestorage.app",
    messagingSenderId: "855632372357",
    appId: "1:855632372357:web:94dd9fa3de42b6c89effec"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); // ovo je baza podataka

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'user', userAuth.uid); //database, user collection, with userAuth id
    console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);  // proverava da li ta instanca usera postoji vec u bazi, tj da li je korisnik vec ulogovan na sajt ili nije, takodje i preko snapshota se pristupa tom podatku
    console.log(userSnapshot);
    console.log(userSnapshot.exists());       
    
    // if user data NOT exist         ** IF **
        // create/set document with the data from userAuth in my collection
    
    // if user data exist             ** ELSE **
        // return userDocRef
    if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createAt = new Date();

        try {
          await setDoc(userDocRef,{
            displayName,
            email,
            createAt,
            ...additionalInformation,
          });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
    }
              // else
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// user sign in ili sign out to su authStateChange i pali se ovaj listener
export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);