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

const divProductos = (producto) => {
  return `
  <div>
    <div class="flex flex-row gap-4 items-stretch">
      <div class="col-span-1">
        <div class="bg-gray-100 rounded-xl overflow-hidden w-32 h-32">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            class="w-32 h-32 object-cover md:object-fill"
          />
        </div>
      </div>
      <div class="w-full flex flex-col justify-between">
        <div class="flex flex-row justify-between">
          <span class="font-bold text-md">${producto.nombre}</span>
          <button class="cursor-pointer">
            <svg
              class="w-6 h-6 text-red-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-row justify-between">
          <span class="font-bold text-xl">$${producto.precio}</span>
          <div class="flex flex-row gap-2 items-center bg-gray-200 p-2 rounded-full">
            <button class="cursor-pointer">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span class="flex-1 text-center px-2 md:px-6">${producto.cantidad}</span>
            <button class="cursor-pointer">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full my-4 h-px bg-gray-200"></div>
  </div>
  `;
};

const agregarProducto = async (nombre, precio, imagen, genero) => {
  try {
    await db.collection("carrito").add({ nombre, precio, imagen, genero });
    await cargarCarrito();
  } catch (error) {
    console.log(`No se puede mostrar el producto, ${error}`);
  }
};

const cargarProductos = async () => {
  try {
    const contenedorP = document.getElementById("carrito");
    const contenedorST = document.getElementById("subtotal");
    const contenedorI = document.getElementById("iva");
    const contenedorT = document.getElementById("total");

    let subtotal = 0;
    let iva = 0;
    let total = 0;
    const carrito = await db.collection("carrito").get();

    carrito.forEach((p) => {
      const producto = p.data();
      contenedorP.innerHTML += divProductos(producto);
      subtotal += producto.precio;
    });

    subtotal -= 10;
    iva = subtotal * 0.15;
    total = subtotal + iva;

    contenedorST.textContent = `${subtotal.toFixed(2)}`;
    contenedorI.textContent = `${iva.toFixed(2)}`;
    contenedorT.textContent = `${total.toFixed(2)}`;
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

cargarProductos();
