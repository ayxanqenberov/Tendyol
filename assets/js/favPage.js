window.addEventListener("scroll", () => {
    let header = document.querySelector("header");
    if (window.scrollY > 90) {
        header.classList.add("headerAfter");
    } else {
        header.classList.remove("headerAfter");
    }
});
const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");

function getData() {
    axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            let products = res.data;
            displayWhishlist(products);
        })
}

function displayWhishlist(products) {
    const productContainer = document.querySelector("#favProducts");
    productContainer.innerHTML = "";

    if (favoriteProducts.length === 0) {
        productContainer.innerHTML += `<p class="haventFavs">Favori listesi boştur</p>`;
        return;
    }

    products.forEach(item => {
        const isFavorite = favoriteProducts.includes(item.title);
        if (isFavorite) {
            productContainer.innerHTML += `
                <div class="products">
                    <div class="up-part-img">
                        <img src="${item.image}" alt="">
                        <p>En çok satan 1. ürün</p>
                        <!-- title'ı tırnak içinde iletmeliyiz -->
                        <i onclick="deleteFav('${item.title.replace(/'/g, "\\'")}')" class="deleteFav fa-solid fa-trash"></i>
                    </div>
                    <div class="down-part-infos">
                        <p>${item.title}</p>
                        <div class="price">
                            <span>790TL</span>
                            <span>${item.price}TL</span>
                        </div>
                        <div class="sale">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                            <span>Son 30 günün en düşük fiyatı</span>
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
                                <span>Çok al az öde</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    getData();
});

function deleteFav(title) {
    const updatedFavorites = favoriteProducts.filter(fav => fav.trim().toLowerCase() !== title.trim().toLowerCase());
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
    favoriteProducts.length = 0; 
    favoriteProducts.push(...updatedFavorites);
    getData();
}
const searchInput = document.querySelector('#searchSystem');
searchInput.addEventListener("input", getSearch);