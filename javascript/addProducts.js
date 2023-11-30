const name = document.getElementById('txtName')
const img = document.getElementById('selectImg')
const description = document.getElementById('txtDescription')
const category = document.getElementById('txtCategory')
const amount = document.getElementById('txtAmount')
const price = document.getElementById('txtPrice')

const add = document.getElementById('btnAddProduct')


let product = [
    {
        id:1,
        nombre:name.value,
        imagen:img.value,
        descripcion:description.value,
        categoria:category.value,
        cantidad:amount.value,
        precio:price.value
    }
]

