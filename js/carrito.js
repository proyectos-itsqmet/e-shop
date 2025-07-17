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
           <button class="eliminar cursor-pointer" data-nombre="${producto.nombre}">
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
             <button class="eliminarProducto cursor-pointer" data-nombre="${producto.nombre}">
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
            <button class="agregarProducto cursor-pointer" data-nombre="${producto.nombre}">
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
    await cargarProductos();
  } catch (error) {
    console.log(`Error al agregar producto: ${error}`);
  }
};

const eliminarProducto = async (nombre) => {
  try {
    const buscar = db.collection("carrito");

    const productos = await buscar.where("nombre", "==", nombre).limit(1).get();

    if (!productos.empty) {
      const doc = productos.docs[0];
      await buscar.doc(doc.id).delete();
      await cargarProductos();
    } else {
      console.log("No se encontró un producto con ese nombre.");
    }
  } catch (error) {
    console.error(`Error al eliminar el producto: ${error}`);
  }
};

const eliminar = async (nombre) => {
  try {
    const productos = await db
      .collection("carrito")
      .where("nombre", "==", nombre)
      .get();

    const batch = db.batch();
    productos.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    await cargarProductos();
    console.log(`Se elimino el producto: ${nombre}`);
  } catch (error) {
    console.error(`Error al eliminar los productos: ${error}`);
  }
};

const cargarProductos = async () => {
  try {
    const contenedorP = document.getElementById("carrito");
    const contenedorST = document.getElementById("subtotal");
    const contenedorI = document.getElementById("iva");
    const contenedorT = document.getElementById("total");

    contenedorP.innerHTML = "";

    let subtotal = 0;
    let iva = 0;
    let total = 0;
    const carrito = await db.collection("carrito").get();

    const productosUnicos = [];
    const unicos = new Set();

    carrito.forEach((p) => {
      const producto = p.data();
      subtotal += producto.precio;

      //! Verificar productos unicos
      if (!unicos.has(producto.nombre)) {
        unicos.add(producto.nombre);
        productosUnicos.push({ cantidad: 1, ...producto });
      } else {
        const productoExistente = productosUnicos.find(
          (p) => p.nombre === producto.nombre
        );

        productoExistente.cantidad += 1;
        productoExistente.precio = producto.precio * productoExistente.cantidad;
      }
    });

    //! Ordenar productos
    productosUnicos.sort((a, b) => {
      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
      return 0;
    });

    //! Agregar elementos al grid
    productosUnicos.forEach((producto) => {
      contenedorP.innerHTML += divProductos(producto);
    });

    //! Boton Eliminar
    document.querySelectorAll(".eliminarProducto").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nombre = btn.getAttribute("data-nombre");
        eliminarProducto(nombre);
      });
    });

    //! Boton Agregar
    document.querySelectorAll(".agregarProducto").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const nombre = btn.getAttribute("data-nombre");
        const prod = productosUnicos.find((p) => p.nombre === nombre);
        if (prod) {
          await agregarProducto(
            prod.nombre,
            prod.precio / prod.cantidad,
            prod.imagen,
            prod.genero
          );
        }
      });
    });

    //! Boton eliminar
    document.querySelectorAll(".eliminar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nombre = btn.getAttribute("data-nombre");
        eliminar(nombre);
      });
    });

    subtotal = productosUnicos.length <= 0 ? 0 : subtotal - 10;
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
