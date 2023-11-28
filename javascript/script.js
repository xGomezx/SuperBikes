const menu = document.getElementById("menu")
const dropMenu = document.getElementById("drop-menu")
let enableMenu = 0;

menu.addEventListener("click",()=>{
  if (enableMenu == 0) {
    dropMenu.style.display = "flex"
    dropMenu.style.flexDirection = "column"
    dropMenu.style.alignItems = "center"
    enableMenu = 1
  }else if (enableMenu == 1) {
    dropMenu.style.display = "none"
    enableMenu = 0
  }
  
})


const openForm = document.getElementById("open-form")
const formProducts = document.getElementById("products-form")
const closeForm = document.getElementById("closeForm")

openForm.addEventListener("click",()=>{
  formProducts.style.visibility="visible"
})
closeForm.addEventListener("click",()=>{
  formProducts.style.visibility="hidden"
})


const selectImg = document.getElementById('selectImg'),
      chargeImg = document.getElementById('chargeImg')

selectImg.addEventListener('change',(event)=>{

  const file = event.target.files[0];
  const imageURL = URL.createObjectURL(file);

  chargeImg.src = imageURL;
  
})

const showCart = document.getElementById('showCart')
const openCart = document.getElementById('openCart')
const closeCart = document.getElementById('closeCart')

showCart.addEventListener("click",()=>{
  openCart.style.visibility="visible"
})
closeCart.addEventListener("click",()=>{
  openCart.style.visibility="hidden"
})
