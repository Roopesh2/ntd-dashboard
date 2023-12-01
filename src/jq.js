/**
 *
 * @param {string} e
 * @param {HTMLElement} c
 * @returns {HTMLElement}
 */
function $(e, c = document) {
	return c.querySelector(e);
}
window.$ = $;
