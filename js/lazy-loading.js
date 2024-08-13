const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const img = entry.target;
			img.src = img.getAttribute("data-src");
			img.removeAttribute("data-src");
			img.classList.add("loaded"); // Add this line
			observer.unobserve(img);
		}
	});
});

images.forEach((img) => {
	observer.observe(img);
});
