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

//filtros

document.addEventListener('keyup', e=>{

  if (e.target.matches('#search')) {
    document.querySelectorAll('.product-card').forEach(product=>{
      product.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ?product.classList.remove('filter')
        :product.classList.add('filter')
    })
  }
})

const sport = document.getElementById('sport');
const naked = document.getElementById('naked');
const adventure = document.getElementById('adventure');
const cross = document.getElementById('cross');
const showAll = document.getElementById('all')

const categories = document.querySelectorAll('.product-categori');

function filterProducts(category) {
  document.querySelectorAll('.product-card').forEach(product => {
    const productCategory = product.querySelector('.product-categori');
    if (productCategory.textContent.toLowerCase().includes(category.toLowerCase())) {
      product.classList.remove('filter');
    } else {
      product.classList.add('filter');
    }
  });
}

showAll.addEventListener('click', () => {
  document.querySelectorAll('.product-card').forEach(product => {
    product.classList.remove('filter');
  });
});
sport.addEventListener('click', () => {
  filterProducts('deportiva');
});

naked.addEventListener('click', () => {
  filterProducts('naked');
});

adventure.addEventListener('click', () => {
  filterProducts('adventure');
});

cross.addEventListener('click', () => {
  filterProducts('cross');
});



