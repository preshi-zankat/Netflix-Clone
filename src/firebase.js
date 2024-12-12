
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD9gllZCqXjDfzjqmqkh7VO8Q4_DBhGLP0",
  authDomain: "netflix-clone-8b200.firebaseapp.com",
  projectId: "netflix-clone-8b200",
  storageBucket: "netflix-clone-8b200.firebasestorage.app",
  messagingSenderId: "461248121598",
  appId: "1:461248121598:web:0830fd83856614692973af",
  measurementId: "G-N7XV4G3VRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const  auth= getAuth(app);

const db= getFirestore(app);

const signup=async(name,email,password)=>{
    try{
     const res= await createUserWithEmailAndPassword(auth,email,password)
     const user=res.user;
     await addDoc(collection(db,"users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
     })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login=async(email,password)=>{
   try {
     const res= await signInWithEmailAndPassword(auth,email,password) 
   } catch (error) {
     console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}

const logout=async()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};