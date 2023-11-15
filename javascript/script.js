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