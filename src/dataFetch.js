import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseInits";

const collRef = collection(db, "jobs");
export async function fetchDocs(lim = 50) {
	const q = query(collRef, orderBy("id", "desc"), limit(lim));
	const qs = await getDocs(q);
	return qs.docs;
}

export async function getLastEntry() {
	let docs = await fetchDocs(1);
	return docs[0].data().id;
}
