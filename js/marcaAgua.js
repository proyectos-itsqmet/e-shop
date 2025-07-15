const cajaContenedor = document.getElementById("cajaContenedor");
const marcaAgua = document.getElementById("marcaAgua");
const imagen = cajaContenedor.querySelector("img");
const srcOriginal = imagen.src;

cajaContenedor.onmouseenter = () => {
  marcaAgua.style.opacity = "1";
  imagen.src = "/e-shop/images/banner/3.jpg";
};

cajaContenedor.onmouseleave = () => {
  marcaAgua.style.opacity = "0";
  imagen.src = srcOriginal;
};
