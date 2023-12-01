import {
	collection,
	getDocs,
	getDocsFromCache,
	limit,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "./firebaseInits";

export const collRef = collection(db, "jobs");
export async function fetchDocs(lim = 50) {
	const q = query(collRef, orderBy("id", "desc"), limit(lim));
	let qs;
	try {
		qs = await getDocsFromCache(q);
		if (qs.docs.length == 0) {
			qs = await getDocs(q);
			console.log("No local cache found: loading from server");
		} else {
			console.log(`Using cache: found ${qs.docs.length} docs`);
		}
	} catch (err) {
		qs = await getDocs(q);
		console.log(err);
		console.log("Error fetching cache: loading from server");
	}
	return qs.docs;
}

export async function getLastEntry() {
	let docs = await fetchDocs(1);
	return docs[0].data().id;
}
