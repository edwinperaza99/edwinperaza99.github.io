const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");

// function to toggle menu
function toggleMenu() {
	menu.classList.toggle("active");
	hamburger.classList.toggle("active");
	// menu.classList.add("fa-x")
	// menu.classList.remove("fa-bars")
}

// set year to current year for footer
// const currentYear = new Date().getFullYear();
// const copyrightYearSpan = document.getElementById("copyright-year");

// copyrightYearSpan.textContent = currentYear;

// function to make scroll button appear
const scrollButton = document.getElementById("scroll-up");

window.addEventListener("scroll", () => {
	console.log(window.scrollY);
	if (window.scrollY > window.innerHeight / 5) {
		scrollButton.classList.add("show");
	} else {
		scrollButton.classList.remove("show");
	}
});
