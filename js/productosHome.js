const firebaseConfig = {
  apiKey: "AIzaSyASpKybXd9xllzP-nU1dp2kUGtxmIGOT7g",
  authDomain: "eshop-ae14c.firebaseapp.com",
  projectId: "eshop-ae14c",
  storageBucket: "eshop-ae14c.firebasestorage.app",
  messagingSenderId: "468037307240",
  appId: "1:468037307240:web:310f28694fedeb3a48e4dd",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const divNuevosProductos = (producto, enCarrito = false) => {
  return `
    <div class="col-span-1 w-full rounded-xl shadow-sm producto-item"
         data-nombre="${producto.nombre}"
         data-precio="${producto.precio}"
         data-imagen="${producto.imagen}"
         data-genero="${producto.genero}">
      <div class="relative bg-gray-100 rounded-t-xl overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold text-3xl opacity-0 transition-opacity duration-300">
          eShop
        </div>
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          class="w-full h-54 object-cover md:object-fill"
        />
      </div>
      <div class="p-2">
        <div class="font-bold text-md">${producto.nombre}</div>
        <div class="flex">
          <div class="flex flex-wrap">
            <svg class="w-6 h-6 text-yellow-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
            <p class="text-md font-light pl-2">${producto.calificacion}</p>
          </div>
        </div>
        <div class="w-full flex justify-between">
          <div class="font-bold text-xl">$${producto.precio}</div>
          ${
            enCarrito
              ? `<svg class="w-6 h-6 text-cyan-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg>`
              : `<button class="btn-agregar text-white bg-cyan-800 hover:bg-cyan-800 px-3 py-1 rounded-lg text-sm cursor-pointer" type="button">Agregar</button>`
          }
        </div>
      </div>
    </div>
  `;
};

const divMasVendidos = (producto, enCarrito = false) => {
  return `
    <div class="col-span-1 w-full rounded-xl shadow-sm producto-item"
         data-nombre="${producto.nombre}"
         data-precio="${producto.precio}"
         data-imagen="${producto.imagen}"
         data-genero="${producto.genero}">
      <div class="relative bg-gray-100 rounded-t-xl overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold text-3xl opacity-0 transition-opacity duration-300">
          eShop
        </div>
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          class="w-full h-54 object-cover md:object-fill"
        />
      </div>
      <div class="p-2">
        <div class="font-bold text-md">${producto.nombre}</div>
        <div class="flex">
          <div class="flex flex-wrap">
            <svg class="w-6 h-6 text-yellow-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
            <p class="text-md font-light pl-2">${producto.calificacion}</p>
          </div>
        </div>
        <div class="w-full flex justify-between">
          <div class="font-bold text-xl">$${producto.precio}</div>
          ${
            enCarrito
              ? `<svg class="w-6 h-6 text-cyan-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg>`
              : `<button class="btn-agregar text-white bg-cyan-800 hover:bg-cyan-800 px-3 py-1 rounded-lg text-sm cursor-pointer" type="button">Agregar</button>`
          }
        </div>
      </div>
    </div>
  `;
};

const agregarProducto = async (nombre, precio, imagen, genero) => {
  try {
    await db.collection("carrito").add({ nombre, precio, imagen, genero });
  } catch (error) {
    console.log(`Error al agregar producto: ${error}`);
  }
};

const cargarProductos = async () => {
  try {
    const productosDB = await db.collection("productos").get();
    const carritoDB = await db.collection("carrito").get();

    const listaProductos = [];
    productosDB.forEach((producto) => {
      listaProductos.push(producto.data());
    });

    const productosEnCarrito = new Set();
    carritoDB.forEach((doc) => {
      const data = doc.data();
      productosEnCarrito.add(data.nombre);
    });

    const nuevosProductos = listaProductos.slice(0, 4);
    const masVendido = listaProductos.slice(4, 8);

    const contenedorNP = document.getElementById("nuevosProductos");
    contenedorNP.innerHTML = "";
    nuevosProductos.forEach((producto) => {
      const enCarrito = productosEnCarrito.has(producto.nombre);
      contenedorNP.innerHTML += divNuevosProductos(producto, enCarrito);
    });

    const contenedorMV = document.getElementById("masVendidos");
    contenedorMV.innerHTML = "";
    masVendido.forEach((producto) => {
      const enCarrito = productosEnCarrito.has(producto.nombre);
      contenedorMV.innerHTML += divMasVendidos(producto, enCarrito);
    });

    document.querySelectorAll(".btn-agregar").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        event.stopPropagation();

        const productoItem = btn.closest(".producto-item");
        const nombre = productoItem.getAttribute("data-nombre");
        const precio = parseFloat(productoItem.getAttribute("data-precio"));
        const imagen = productoItem.getAttribute("data-imagen");
        const genero = productoItem.getAttribute("data-genero");

        await agregarProducto(nombre, precio, imagen, genero);
        await cargarProductos();
      });
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

cargarProductos();
