
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
const buy = document.getElementById('buy')
const body = document.querySelector('body')
const closeCart = document.getElementById('closeCart')
const deleteCart = document.getElementById('emptyCart')


let list = getDataToLocalStorage['list'] || [
    {
        nombre: "KTM Super Duke 1290r",
        urlImagen: "https://lamoto.com.ar/wp-content/uploads/2023/03/KTM-1290-Super-Duke-RR-2023-diagonal.jpg",
        descripcion: "La KTM Super Duke 1290: una naked de alta potencia y agilidad con un motor V-twin de 1301 cc, tecnología avanzada y diseño agresivo para una experiencia de conducción emocionante.",
        categoria:"Naked",
        cantidad:4,
        precio:120000000
    }
];
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

    let exist = true;
    let amountCart = 1;
    for (let i = 0; i < list.length; i++) {
        
        if (list[i].nombre == products[indice].nombre ) {
            exist = false
        }
    }
    if (exist == false) {
        updateAmount(indice)
        let van = true
        let i = 0
        while(van == true){
            if(products[i].nombre == products[indice].nombre){
                products[i].cantidad -= 1
                seedata()
                van = false
            }
            saveDataToLocalStorage('products',products)
            saveDataToLocalStorage('list',list)
            i += 1
        }
        showListItems()
       }
    if (exist == true) {
        list.push({nombre: products[indice].nombre, precio: products[indice].precio, cantidad: amountCart})
        let van = true
        let i = 0
        while(van == true){
            if(products[i].nombre == products[indice].nombre){
                products[i].cantidad -= 1
                seedata()
                van = false
            }
            saveDataToLocalStorage('products',products)
            saveDataToLocalStorage('list',list)
            i += 1
        }
        number.innerHTML = `<p>${list.length}</p>`
          number.style.visibility = 'visible'
    }

    showListItems()
    return list     
}

function updateAmount(indice) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].nombre === products[indice].nombre) {
        list[i].cantidad += 1;
        saveDataToLocalStorage('list', list);
        break;
      }
    }
}




cart.addEventListener('click',function () {
    shoppingCart.style.visibility = 'visible'
    showListItems()
})

function showListItems() {
    productsInCart.innerHTML = ""
    totalValue = 0
    list = getDataToLocalStorage('list')
    for (let i = 0; i < list.length; i++) {
        productsInCart.innerHTML += `<div class="productsInCarts">
            <div class="productInfo">
                <h2 class="cartTitule">${list[i].nombre}</h2>
                <p class="priceCart">Precio COP: $${list[i].precio}</p>
            </div>
            <div class="quantityProducts">
                <img onclick=deleteP(${i}) class="trash" src="assets/trash.svg" alt="">
                <p class="amount">${list[i].cantidad}</p>
            </div>
        </div>`
        
        totalValue += parseInt(list[i].precio)
    }
    total.innerHTML = `Valor Total: $${totalValue}`
}

function deleteP(indice) {
    let van = true
    let i = 0
    while(van == true){
        if(products[i].nombre == list[indice].nombre){
            products[i].cantidad += list[indice].cantidad
            seedata()
            list.splice(indice,1)
            van = false
        }
        i += 1
    }
    saveDataToLocalStorage('products',products)
    saveDataToLocalStorage('list',list)
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



function emptyCart() {
    for (let i = 0; i < list.length; i++) {
        let productIndex = products.findIndex(product => product.nombre === list[i].nombre);
        if (productIndex !== -1) {
            products[productIndex].cantidad += list[i].cantidad;
        }
    }
    list = [];
    saveDataToLocalStorage('list', list);
    saveDataToLocalStorage('products', products);

    seedata();
    showListItems();
    number.style.visibility = 'hidden';
}


deleteCart.addEventListener('click', emptyCart);


function completePurchase() {

    list = [];
    saveDataToLocalStorage('list', list);
  
    showListItems();
    number.style.visibility = 'hidden';

    alert('¡Compra realizada con éxito!');
}

buy.addEventListener('click', completePurchase);
