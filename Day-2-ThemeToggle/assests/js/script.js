const toggle = document.getElementById("themeToggle");
const am = document.querySelector(".am");
const pm = document.querySelector(".pm");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
	document.body.classList.add("dark");
	toggle.checked = true;
	am.classList.remove("active");
	pm.classList.add("active");
}

toggle.addEventListener("change", () => {
	if (toggle.checked) {
		document.body.classList.add("dark");
		localStorage.setItem("theme", "dark");

		am.classList.remove("active");
		pm.classList.add("active");
	} else {
		document.body.classList.remove("dark");
		localStorage.setItem("theme", "light");

		pm.classList.remove("active");
		am.classList.add("active");
	}
});