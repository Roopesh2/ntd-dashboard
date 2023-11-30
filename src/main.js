import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
	getFirestore,
	doc,
	setDoc,
	query,
	collection,
	getDocs,
	orderBy,
	Query,
	limit,
	Timestamp,
	addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAnXURp29t0wptiVig6QFDLXj3wEDXqcZs",
	authDomain: "ntd-db.firebaseapp.com",
	projectId: "ntd-db",
	storageBucket: "ntd-db.appspot.com",
	messagingSenderId: "260848498496",
	appId: "1:260848498496:web:cf996981def66a064beca5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

var btn = document.querySelector("button"),
	table = document.querySelector("tbody");

let provider = new GoogleAuthProvider();

if (!app)
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			console.log(token, user);
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
		});

let row = (d) => `
<tr>
	<td>${d.id}</td>
	<td>${d.client}</td>
	<td>${toDate(d.start)}</td>
	<td>${toDate(d.end)}</td>
	<td>${d.returns}</td>
	<td>${d.cost}</td>
</tr>`;

const collRef = collection(db, "jobs");

async function fetchDocs(lim = 50) {
	const q = query(collRef, orderBy("id", "desc"), limit(lim));
	const qs = await getDocs(q);
	return qs.docs;
}

async function getLastEntry() {
	let docs = await fetchDocs(1);
	return docs[0].data().id;
}

window.addEventListener("load", async () => {
	// fetch data
	let data = await fetchDocs(50);
	for (let doc of data) {
		let d = doc.data();
		table.innerHTML += row(d);
	}
});

function toDate(d) {
	let add0 = (k) => (k < 10 ? "0" + k : k);

	/** @type {Date} */
	let s = d.toDate();
	let date = add0(s.getDate());
	let month = add0(s.getMonth() + 1);
	let year = add0(s.getFullYear());
	let h = add0(s.getHours());
	let m = add0(s.getMinutes());
	let sec = add0(s.getSeconds());
	return `${date}/${month}/${year} <br> ${h}:${m}:${sec}`;
}

btn.addEventListener("click", async () => {
	getLastEntry().then(async (id) => {
		let dat = {
			id: ++id,
			client: document.querySelector("#client").value,
			cost: parseFloat(document.querySelector("#cost").value),
			start: Timestamp.fromDate(new Date(document.querySelector("#start").value)),
			end: Timestamp.fromDate(new Date(document.querySelector("#end").value)),
			returns: parseFloat(document.querySelector("#return").value),
		};
		const docRef = await addDoc(collRef, dat);
		console.log("added", docRef.id);
		table.innerHTML = row(dat) + table.innerHTML;
	});
});
