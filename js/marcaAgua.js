const cajaContenedor = document.getElementById("cajaContenedor");
const marcaAgua = document.getElementById("marcaAgua");

cajaContenedor.onmouseenter = () => {
  marcaAgua.style.opacity = "1";
};

cajaContenedor.onmouseleave = () => {
  marcaAgua.style.opacity = "0";
};

const imagen = cajaContenedor.querySelector("img");
const srcOriginal = imagen.src;

cajaContenedor.onmouseenter = () => {
  marcaAgua.style.opacity = "1";
  imagen.src = "../images/banner/3.jpg";
};

cajaContenedor.onmouseleave = () => {
  marcaAgua.style.opacity = "0";
  imagen.src = srcOriginal;
};
