const DO_NOTHING = async () => 0;
/**
 *
 * @param {HTMLElement} dialouge
 * @param {function} actionFn
 * @param {function} closeFn
 */
export function dialougeManager(dialouge, actionFn = DO_NOTHING, closeFn = DO_NOTHING) {
	let closeBtn = $(".close-btn", dialouge),
		actionBtn = $(".action-btn", dialouge),
		dropShadow = $(".drop-shadow", dialouge),
		box = $(".dialouge-box", dialouge);
	closeBtn.addEventListener("click", async (e) => {
		await closeFn();
		closeDialouge();
	});
	actionBtn.addEventListener("click", async (e) => {
		await actionFn(actionBtn);
		closeDialouge();
	});

	function closeDialouge() {
		dialouge.classList.add("hidden")
	}

	return {
		closeBtn,
		actionBtn,
		dropShadow,
		box,
		closeDialouge,
		openDialouge: function () {
			dialouge.classList.remove("hidden")
		}
	}
}
