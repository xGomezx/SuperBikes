
function saveDataToLocalStorage(key,dataSave){
    localStorage.setItem(key,JSON.stringify(dataSave))
}

function getDataToLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key))
    return data
}
products = getDataToLocalStorage('products') || []

const infoPurchase = document.getElementById('infoPurchase')
const shoppingCart = document.getElementById('shoppingCart')
const productsInCart = document.getElementById('productsInCart')
const showProduct = document.getElementById('showProducts')
const cart = document.getElementById('showCart')
const number = document.getElementById('number')
const total = document.getElementById('total')
const body = document.querySelector('body')
const closeCart = document.getElementById('closeCart')


let list = [];
let totalValue = 0;


window.addEventListener('load',()=>{
    seedata()
    shoppingCart.style.visibility="hidden"
})

function seedata() {
    showProduct.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        
        if(products[i].cantidad > 0){
            showProduct.innerHTML += `<div class="product-card" >
            <h2 class="titule-Product">${products[i].nombre}</h2>
            <img id="imageProduct" class="img-product" src="${products[i].urlImagen}" >
            <p id="description" class="product-description">${products[i].descripcion}</p>
            <div class="product-info">
                <p class="product-categori">Categoria:${products[i].categoria} </p>
                <p class="product-stock">Disponibles: ${products[i].cantidad}</p>
                <p class="p-price">Precio COP: $ ${products[i].precio}</p>
            </div>
            <button class="button-add" onclick=purchase(${i})>Agregar al carrito </button>
        </div>`
        }else{
            showProduct.innerHTML += `<div class="product-card" >
            <h2 class="titule-Product">${products[i].nombre}</h2>
            <img id="imageProduct" class="img-product" src="${products[i].urlImagen}" >
            <p id="description" class="product-description">${products[i].descripcion}</p>
            <div class="product-info">
                <p class="product-categori">Categoria:${products[i].categoria} </p>
                <p class="product-stock">Disponibles: ${products[i].cantidad}</p>
                <p class="p-price">Precio COP: $ ${products[i].precio}</p>
            </div>
            <p class="soldOut">Agotado</p>
        </div>`
        }
        
    }
}

function purchase(indice) {

    list.push({nombre: products[indice].nombre, precio: products[indice].precio})

    let van = true
    let i = 0
    while(van == true){
        if(products[i].nombre == products[indice].nombre){
            products[i].cantidad -= 1
            seedata()
            van = false
        }
        saveDataToLocalStorage('products',products)
        i += 1
    }
    number.innerHTML = `<p>${list.length}</p>`
    number.style.visibility = 'visible'
    return list

}

cart.addEventListener('click',function () {
    body.style.overflow = 'hidden'
    shoppingCart.style.visibility = 'visible'
    showListItems()
})

function showListItems() {
    productsInCart.innerHTML = ""
    totalValue = 0

    for (let i = 0; i < list.length; i++) {
        
        productsInCart.innerHTML += `<div class="productsInCarts">
            <div class="productInfo">
                <h2 class="cartTitule">${list[i].nombre}</h2>
                <p class="priceCart">Precio COP: $${list[i].precio}</p>
            </div>
            <div class="quantityProducts">
                <img onclick=deleteP(${i}) class="trash" src="assets/trash.svg" alt="">
                <input class="amount" type="number" min="0" max="99" id="" placeholder="0">
            </div>
        </div>`
        
        totalValue += parseInt(list[i].precio)
    }
    totalValue.innerHTML += `<p class="total">Valor Total: $${totalValue}</p>`
}

function deleteP(indice) {
    let van = true
    let i = 0
    while(van == true){
        if(products[i].nombre == list[indice].nombre){
            products[i].cantidad += 1
            seedata()
            list.splice(indice,1)
            van = false
        }
        
        i += 1
    }
    saveDataToLocalStorage('products',products)
    number.innerHTML = `<p>${list.length}</p>`
    if(list.length == 0){
        number.style.visibility = 'hidden'
    }
    seedata()
    showListItems()
}
closeCart.addEventListener('click',()=>{
    body.style.overflow = 'auto'
    shoppingCart.style.visibility = 'hidden'
})