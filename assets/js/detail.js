let searchParametre = new URLSearchParams(window.location.search);
let id = searchParametre.get("id")
if(id){
    getMoreInfo(id)
}

function getMoreInfo(id) {
    axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
            let product = res.data

    document.querySelector("#moreInfoSect").innerHTML=`
    <div id="moreInfos">
                <img src="${product.image}" alt="">
                <div class="informations">
                    <p class="title">${data}</p>
                    <p class="description">Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday</p>
                    <div class="category"><span>Category :</span> <span>men's cloth</span></div>
                    <div class="ratings">
                        <span>2.4</span>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <span>(400)</span>
                        
                    </div>
                    <div class="price">
                        <div class="sale">
                            <i class="fa-solid fa-arrow-trend-down"></i>
                            <span>Son 3 gunun en dusuk fiyati</span>
                        </div>
                        <span class="productPrice">500Tl</span>
                    </div>
                    <button class="atToBasket">Sepete Ekle</button>
                </div>
            </div>
    `
})
}
getMoreInfo(id)