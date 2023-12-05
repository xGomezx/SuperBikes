
data = JSON.parse(localStorage.getItem("formData")) || []

function saveDataToLocalStorage(){
    localStorage.setItem("formData",JSON.stringify(data))
}

const infoPurchase = document.getElementById('infoPurchase')
const shoppingCart = document.getElementById('shoppingCart')
const dataInCarts = document.getElementById('dataInCarts')
const showProduct = document.querySelector('#showdata')
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
    showProduct.innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        
        if(data[i].amount > 0){
            showProduct.innerHTML += `<div class="product-card" >
            <h2 class="titule-Product">${data[i].name}</h2>
            <img id="imageProduct" class="img-product" src="${data[i].img}" >
            <p id="description" class="product-description">${data[i].description}</p>
            <div class="product-info">
                <p class="product-categori">Categoria:${data[i].category} </p>
                <p class="product-stock">Disponibles: ${data[i].amount}</p>
                <p class="p-price">Precio COP: $ ${data[i].price}</p>
            </div>
            <button class="button-add" onclick=purchase(${i})>Agregar al carrito </button>
        </div>`
        }else{
            showProduct.innerHTML += `<div class="product-card" >
            <h2 class="titule-Product">${data[i].name}</h2>
            <img id="imageProduct" class="img-product" src="${data[i].img}" >
            <p id="description" class="product-description">${data[i].description}</p>
            <div class="product-info">
                <p class="product-categori">Categoria:${data[i].category} </p>
                <p class="product-stock">Disponibles: ${data[i].amount}</p>
                <p class="p-price">Precio COP: $ ${data[i].price}</p>
            </div>
            <p class="soldOut">Agotado</p>
        </div>`
        }
        
    }
}

function purchase(indice) {
    list.push({nombre:data[indice].name, precio: data[indice].price})

    let van = true
    let i = 0
    while(van == true){
        if(data[i].name == list[indice].name){
            data[i].amount -= 1
            if(data.amount == 0){
                seedata()
            }
            van = false
        }
        saveDataInLocalStorage('data',data)
        i += 1
    }
    number.innerHTML = `<p>${list.length}</p>`
    return list
}

