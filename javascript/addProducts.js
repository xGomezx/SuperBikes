const txtName = document.getElementById('txtName')
const txtImg = document.getElementById('selectImg')
const txtDescription = document.getElementById('txtDescription')
const txtCategory = document.getElementById('txtCategory')
const txtAmount = document.getElementById('txtAmount')
const txtPrice = document.getElementById('txtPrice')

const form = document.getElementById('form')
const add = document.getElementById('btnAddProduct')
const showProducts = document.getElementById('showProducts')

let data = JSON.parse(localStorage.getItem("formData")) || []
renderCards()



function validateExistence(){

    let existence = true;

    for (let i = 0; i < data.length; i++) {

        if(data[i].name == txtName.value){
            existence = false
        } 
    }
    return existence
}

add.addEventListener('click',function(event){
    event.preventDefault();

    const name = txtName.value
    const img = txtImg.value
    const description = txtDescription.value
    const category = txtCategory.value
    const amount = txtAmount.value
    const price = txtPrice.value

    let verify = validateData();

    if(verify == true){
        let existence = validateExistence()

        if(existence == true){
            const newData = {name,img,description,category,amount,price}
            data.push(newData)
            saveDataToLocalStorage()
            renderCards()
            form.reset()
        }else{
            alert("El producto ya existe")
        }
      
    }
})

function saveDataToLocalStorage(){
    localStorage.setItem("formData",JSON.stringify(data))
}

function renderCards(){
    showProducts.innerHTML = '';
    data.forEach(function(item,index ) {
        
        const targetDiv = document.createElement('div');
        const nameH2 = document.createElement('h2')
        const imgProduct = document.createElement('img')
        const descriptionP = document.createElement('p')
        const divInfo = document.createElement('div')
        const categoryP = document.createElement('p')
        const stockP = document.createElement('p')
        const divPrice = document.createElement('div')
        const priceP = document.createElement('p')
        const buttonInput = document.createElement('input')

        nameH2.textContent = item.name
        imgProduct.src = item.img
        descriptionP.textContent = item.description
        categoryP.textContent = "Categoria: "+item.category
        stockP.textContent = "Disponibles: "+item.amount
        priceP.textContent = "Precio COP: $"+item.price
        buttonInput.value = "Agregar al carrito"


        targetDiv.classList.add('products')
        targetDiv.classList.add('product-card')
        nameH2.classList.add('titule-Product')
        imgProduct.classList.add('img-product')
        descriptionP.classList.add('product-description')
        divInfo.classList.add('product-info')
        categoryP.classList.add('product-categori')
        stockP.classList.add('product-stock')
        divPrice.classList.add('product-price')
        priceP.classList.add('p-price')
        buttonInput.classList.add('button-add')



        divPrice.appendChild(priceP)

        divInfo.appendChild(stockP)
        divInfo.appendChild(categoryP)
        divInfo.appendChild(divPrice)
       
        targetDiv.appendChild(nameH2);
        targetDiv.appendChild(imgProduct);
        targetDiv.appendChild(descriptionP);
        targetDiv.appendChild(divInfo);
        targetDiv.appendChild(buttonInput);

        showProducts.appendChild(targetDiv)

    
    });
}

function validateData (){

    if(txtName.value == ""){
        alert("El nombre no puede estar vacio")
        return false
    }
    if(txtImg.value == ""){
        alert("la imagen no puede estar vacia")
        return false
    }
    if(txtDescription.value == ""){
        alert("La descripcion no puede estar vacia")
        return false
    }
    if(txtCategory.value == ""){
        alert("La descripcion no puede estar vacia")
        return false
    }
    if(txtAmount.value == ""){
        alert("La cantidad no puede estar vacia")
        return false
    }
    if(txtPrice.value == ""){
        alert("El precio no puede estar vacio")
        return false
    }
    return true
}

// editar

const productEd = document.getElementById('editProduct')
const atributeEd = document.getElementById('editAtribute')
const valueEd = document.getElementById('txtNewValue')

document.getElementById('btnEditProduct').addEventListener('click',function(event){

    event.preventDefault()

    let dataProduct = productEd.value
    let dataAtribute = atributeEd.value
    let dataValue = valueEd.value
    let van = false

    if (dataProduct == "" || dataAtribute == "" || dataValue == "") {
        alert('Ninguno de los campos puede estar vacio')
    } else {
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == dataProduct){
                data[i][dataAtribute] = dataValue;
                van = true
            }
            
        }
        if(van == true){
            alert('Cambio realizado')
            window.location.reload()
        }else{
            alert('No se pudo realizar el cambio, intenta de nuevo')
        }
        saveDataToLocalStorage('FormData',data)
    }
})

// Eliminar

const productDel = document.getElementById('deleteProduct')

document.getElementById('btnDeleteProduct').addEventListener('click',function(event){

    event.preventDefault()

    let deleteProduct = productDel.value
    let van = false

    for (let i = 0; i < data.length; i++) {
        
        if(data[i].name == deleteProduct){
            data.splice(i,1)
            van = true
        }
    }
    if(van == false){
        alert('No se pudo realizar el cambio, intenta de nuevo')
    }else{
        alert('Cambio realizado')
        window.location.reload()
    }
    saveDataToLocalStorage('FormData',data)
})

// mostrar productos

window.addEventListener('load',()=>{
    const productEd = document.getElementById('editProduct')
    const productDel = document.getElementById('deleteProduct')

    for (let i = 0; i < data.length; i++) {
       productEd.innerHTML += `<option>${data[i].name}</option>`
       productDel.innerHTML += `<option>${data[i].name}</option>`
    }
    Object.keys(data[0]).forEach(Element => {
        atributeEd.innerHTML += `<option>${Element}</option>`
    })
})

