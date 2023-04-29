const images = [{
	url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07648130.jpg',
	title: 'HP ZBook Fury 17.3 inch G8'
}, {
	url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06724589.jpg',
	title: 'HP ZBook Studio G7'
}, {
	url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06343233.jpg',
	title: 'HP ZBook 14u G6'
}, {
	url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06716928.jpg',
	title: 'HP ZBook Create G7'
}];

function initSlider() {
	if (!images || !images.length) return console.log('error');

	const sliderImages = document.querySelector(".slider-images");
	const sliderArrows = document.querySelector(".slider-arrows");
	const sliderDots = document.querySelector(".slider-dots");

	initImages();
	initArrows();
	initTitles();
	initDots();
	autoSlide();

	function initImages() {
		images.forEach((image, index) => {
			const imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}"  data-index="${index}">
            <img src='${images[index].url}' alt="${images[index].title}" width="400" height="400" loading="lazy">
            </div>`;
			sliderImages.innerHTML += imageDiv;
		});
	}

	function initArrows() {
		sliderArrows.querySelectorAll(".slider-arrows__arrow").forEach(arrow => {
			arrow.addEventListener("click", () => {
				const currNumber = +sliderImages.querySelector(".active").dataset.index;
				let nextNumber;
				if (arrow.classList.contains("_left")) {
					nextNumber = currNumber === 0 ? images.length - 1 : currNumber - 1;
				} else {
					nextNumber = currNumber === images.length - 1 ? 0 : currNumber + 1;
				}
				moveSlider(nextNumber);
			});
		});
	}

	function initTitles() {
		if (!images || !images.length) return console.log('error');
		const imageTitle = `<div class="slider-images__title">${images[0].title}</div>`;
		sliderImages.innerHTML += imageTitle;
	}

	function initDots() {
		if (!images || !images.length) return console.log('error');

		images.forEach((image, index) => {
			const sliderDot = `<div class="slider-dots-item n${index} ${index === 0 ? "active" : ""}" 
            data-index="${index}"></div>`;
			sliderDots.innerHTML += sliderDot;
		});

		sliderDots.querySelectorAll(".slider-dots-item").forEach((dot, index) => {
			dot.addEventListener("click", () => {
				moveSlider(index);
			});
		});
	}

	function autoSlide() {
		setInterval(() => {
			const currNumber = +sliderImages.querySelector(".active").dataset.index;
			const nextNumber = currNumber === images.length - 1 ? 0 : currNumber + 1;
			moveSlider(nextNumber);
		}, 5000);
	}

	function moveSlider(num) {
		sliderImages.querySelector(".active").classList.remove("active");
		sliderImages.querySelector(`.n${num}`).classList.add("active");
		sliderImages.querySelector(".slider-images__title").innerText = `${images[num].title}`;
		sliderDots.querySelector(".active").classList.remove("active");
		sliderDots.querySelector(`.n${num}`).classList.add("active");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	initSlider();
});