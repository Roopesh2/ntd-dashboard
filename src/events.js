import { Timestamp, addDoc } from "firebase/firestore";
import { collRef, fetchDocs, getLastEntry } from "./dataFetch";
import { dialougeManager } from "./dialouge-manager";
import { addRow, val } from "./utils";

const newJobBtn = $("#add-job");
const jobsDialouge = $("#jobs-dialouge");
var table = document.querySelector("#jobs-data > tbody");


window.addEventListener("load", async () => {
	// fetch data on load
	let documents = await fetchDocs(50);
	for (let doc of documents) {
		table.innerHTML += addRow(doc.data());
	}
});


/**
 *
 * @param {HTMLButtonElement} actionBtn
 */
async function addNewJob (actionBtn) {
	actionBtn.innerHTML = "Adding"
	actionBtn.style.backgroundColor = "var(--primary-in)"
	await getLastEntry().then(async (id) => {
		let data = {
			id: ++id,
			client: val("#client"),
			cost: parseFloat(val("#cost")),
			start: Timestamp.fromDate(new Date(val("#start"))),
			end: Timestamp.fromDate(new Date(val("#end"))),
			returns: parseFloat(val("#return")),
		};
		const docRef = await addDoc(collRef, data);
		console.log("added", docRef.id);
		table.innerHTML = addRow(data) + table.innerHTML;
		actionBtn.innerHTML = "Add Record"
	actionBtn.style.backgroundColor = "var(--primary)"
	});
}

const dm = dialougeManager(jobsDialouge, addNewJob);
newJobBtn.addEventListener("click", dm.openDialouge)

window.addEventListener("keydown", (e) => {
	if (e.key == "Escape") {
		dm.closeDialouge();
	}
})
