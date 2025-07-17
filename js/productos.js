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
    <div class="col-span-1 w-full rounded-xl shadow-sm cursor-pointer">
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
        <div class="font-bold text-xl">$${producto.precio}</div>
      </div>
    </div>
  `;
};

const cargarProductos = async () => {
  try {
    const productos = await db.collection("productos").get();

    const listaProductos = [];

    productos.forEach((producto) => {
      listaProductos.push(producto.data());
    });

    const contenedorP = document.getElementById("productos");

    listaProductos.forEach((producto) => {
      contenedorP.innerHTML += divProductos(producto);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

cargarProductos();
