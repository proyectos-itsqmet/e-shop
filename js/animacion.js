const titulo = "¡Bienvenido a eShop!";
const titulon = document.getElementById("tituloAnimacion");
let index = 0;

const escribirTitulo = () => {
  if (index < titulo.length) {
    titulon.textContent += titulo.charAt(index);
    index++;
    setTimeout(escribirTitulo, 100);
  }
};

document.addEventListener("DOMContentLoaded", escribirTitulo);
