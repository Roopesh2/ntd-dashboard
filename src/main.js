import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Timestamp, addDoc } from "firebase/firestore";
import { collRef, fetchDocs, getLastEntry } from "./dataFetch";
import { addRow, val } from "./utils";
import { app, auth, provider } from "./firebaseInits";

var btn = document.querySelector("button"),
	table = document.querySelector("tbody");

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

window.addEventListener("load", async () => {
	// fetch data
	let data = await fetchDocs(50);
	for (let doc of data) {
		let d = doc.data();
		table.innerHTML += addRow(d);
	}
});

btn.addEventListener("click", async () => {
	getLastEntry().then(async (id) => {
		let dat = {
			id: ++id,
			client: val("#client"),
			cost: parseFloat(val("#cost")),
			start: Timestamp.fromDate(new Date(val("#start"))),
			end: Timestamp.fromDate(new Date(val("#end"))),
			returns: parseFloat(val("#return")),
		};
		const docRef = await addDoc(collRef, dat);
		console.log("added", docRef.id);
		table.innerHTML = addRow(dat) + table.innerHTML;
	});
});
