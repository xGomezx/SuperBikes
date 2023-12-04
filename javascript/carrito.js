function saveDataToLocalStorage(key,dataSave) {
    localStorage.setItem(key,JSON.stringify(dataSave))
}

function getDataToLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key))
    return data
}

let products = saveDataToLocalStorage('products') || []



let list = [];
let totalValue = 0;