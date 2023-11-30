/**
 *
 * @param {import("firebase/firestore").DocumentData} dbData
 * @returns {string}
 */
function toDate(dbData) {
	let add0 = (k) => (k < 10 ? "0" + k : k);

	/** @type {Date} */
	let s = dbData.toDate(),
		date = add0(s.getDate()),
		month = add0(s.getMonth() + 1),
		year = add0(s.getFullYear()),
		h = add0(s.getHours()),
		m = add0(s.getMinutes()),
		sec = add0(s.getSeconds());

	return `${date}/${month}/${year} <br> ${h}:${m}:${sec}`;
}

export function addRow(data) {
	return `
<tr>
	<td>${data.id}</td>
	<td>${data.client}</td>
	<td>${toDate(data.start)}</td>
	<td>${toDate(data.end)}</td>
	<td>${data.returns}</td>
	<td>${data.cost}</td>
</tr>`;
}

/**
 *
 * @param {string} qs
 * @returns {string}
 */
export const val = (qs) => document.querySelector(qs).value;
