window.addEventListener("scroll", () => {
    let header = document.querySelector("header");
    if (window.scrollY > 270) {
        header.classList.add("headerAfter");
    } else {
        header.classList.remove("headerAfter");
    }
});

const products = document.querySelector(".popularProducts");
function getData() {
    axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            let data = res.data;
            visiblity(data);
        });
}
function visiblity(data) {
    const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    products.innerHTML = "";

    data.forEach((item) => {
        const isFavorite = favoriteProducts.includes(item.title);
        products.innerHTML += `
        <div class="products">
            <div class="up-part-img">
                <img src="${item.image}" alt="">
                <p>En cok satilan 1. urun</p>
                <i onclick="addFav(event)" class="myFav ${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart" style="color: ${isFavorite ? 'red' : ''};"></i>
            </div>
            <div class="down-part-infos">
                <p onclick="moreInfos()">${item.title}</p>
                <div class="price">
                    <span>790TL</span>
                    <span>${item.price}TL</span>
                </div>
                <div class="sale">
                    <i class="fa-solid fa-arrow-trend-down"></i>
                    <span>Son 30 gunun en dusuk fiyati</span>
                </div>
                <div class="ratings">
                    <span>${item.rating.rate}</span>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half"></i>
                    </div>
                    <span>(${item.rating.count})</span>
                </div>
                <div class="opportunity">
                    <div class="coupon">
                        <img src="https://cdn.dsmcdn.com/web/production/campaign-coupon-icon.svg" alt="">
                        <span>150 TL Kupon</span>
                    </div>
                    <div class="buymorepayless">
                        <img src="https://cdn.dsmcdn.com/web/production/campaign-product-promotion-icon.svg" alt="">
                        <span>Cok al az ode</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}
function addFav(event) {
    event.stopPropagation();
    const productTitle = event.target.parentNode.parentNode.querySelector(".down-part-infos p").textContent;
    event.target.classList.toggle("fa-solid");
    event.target.classList.toggle("fa-regular");
    event.target.style.color = event.target.classList.contains("fa-solid") ? "red" : "";

    const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    if (event.target.classList.contains("fa-solid")) {
        if (!favoriteProducts.includes(productTitle)) {
            favoriteProducts.push(productTitle);
        }
    } else {
        const index = favoriteProducts.indexOf(productTitle);
        if (index !== -1) {
            favoriteProducts.splice(index, 1);
        }
    }
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
}

const search = document.querySelector('#searchSystem');
search.addEventListener("input", getSearch);

function getSearch() {
    let value = search.value.toLowerCase().trim();

    axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            let data = res.data;
            let filteredData = data.filter(item => item.title.toLowerCase().includes(value));
            if (filteredData.length > 0) {
                visiblity(filteredData);
            } else {
                products.innerHTML = `
                <div class="searchError">
                    <p>Melumat tapilmadi</p>
                    <i class="alertIcon fa-solid fa-triangle-exclamation"></i>
                </div>
                `;
            }
            search.value += "";
        });
}
getData();
const carouselContainer = document.querySelector('.carousel-sponsor');
if (carouselContainer) {
    const slides = carouselContainer.querySelectorAll('.childDivs-sponsor');
    const slideCount = slides.length;
    let currentSlideIndex = 0;
    const nextButton = document.querySelector('.rightArrow');
    const prevButton = document.querySelector('.leftArrow');

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slideCount;
        updateSlides();
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
        updateSlides();
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - currentSlideIndex) * 100}%)`;
        });
    }
    updateSlides();
}

function moreInfos() {
    window.location.href = '../assets/pages/details.html'
    const moreInfo = document.querySelector("#moreInfo")
    moreInfo.innerHTML = ``
}

