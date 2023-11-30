import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAnXURp29t0wptiVig6QFDLXj3wEDXqcZs",
	authDomain: "ntd-db.firebaseapp.com",
	projectId: "ntd-db",
	storageBucket: "ntd-db.appspot.com",
	messagingSenderId: "260848498496",
	appId: "1:260848498496:web:cf996981def66a064beca5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
