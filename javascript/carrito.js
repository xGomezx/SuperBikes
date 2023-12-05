function saveDataToLocalStorage(key,dataSave) {
    localStorage.setItem(key,JSON.stringify(dataSave))
}

function getDataToLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key))
    return data
}

let products = saveDataToLocalStorage('products') || []


const infoPurchase = document.getElementById('infoPurchase')
const openCart = document.getElementById('openCart')
const productsInCarts = document.getElementById('productsInCarts')



let list = [];
let totalValue = 0;