let searchParametre = new URLSearchParams(window.location.search);
let id = searchParametre.get("id")

function getMoreInfo(id) {
    axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
            let product = res.data

    document.querySelector("#moreInfoSect").innerHTML+=`
    <div id="moreInfos">
                <img src="${product.image}" alt="">
                <div class="informations">
                    <p class="title">${product.title}</p>
                    <p class="description">${product.description}</p>
                    <div class="category"><span>Category: ${product.category}</span></div>
                    <div class="ratings">
                        <span>${product.rating.rate}</span>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <span>(${product.rating.count})</span>
                        
                    </div>
                    <div class="price">
                        <div class="sale">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                            <span>Son 3 gunun en dusuk fiyati</span>
                        </div>
                        <span class="productPrice">${product.price}TL</span>
                    </div>
                    <button class="atToBasket">Sepete Ekle</button>
                </div>
            </div>
    `
})
}
getMoreInfo(id)