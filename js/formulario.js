const registros = [
  {
    nombre: "Gerardo",
    apellido: "Araque",
    celular: "1234567890",
    email: "garaque@correo.com.ec",
    mensaje: "Registro de prueba",
  },
  {
    nombre: "Veronica",
    apellido: "Zapata",
    celular: "0987654321",
    email: "vzapata@correo.com.ec",
    mensaje: "Registro de prueba 2",
  },
];

const formulario = document.getElementById("formularioContacto");
const registrosTabla = document.getElementById("registrosContactos");
const registrosLista = document.getElementById("registrosContactosLista");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = formulario.nombre.value.trim();
  const apellido = formulario.apellido.value.trim();
  const celular = formulario.celular.value.trim();
  const email = formulario.email.value.trim();
  const mensaje = formulario.mensaje.value.trim();

  const nuevoContacto = { nombre, apellido, celular, email, mensaje };

  registros.push(nuevoContacto);

  agregarFila(nuevoContacto);

  formulario.reset();
});

function agregarFila(contacto) {
  const row = document.createElement("tr");
  const rowLista = document.createElement("div");

  row.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contacto.nombre}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contacto.apellido}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contacto.celular}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contacto.email}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contacto.mensaje}</td>
  `;

  rowLista.innerHTML = `
    <div class="bg-gray-100 p-4 rounded-xl mb-4">
        <p class="text-sm text-gray-500"><span class="font-bold">Nombres y apellidos:</span> ${contacto.nombre} ${contacto.apellido}</p>
        <p class="text-sm text-gray-500"><span class="font-bold">Celular:</span> ${contacto.celular}</p>
        <p class="text-sm text-gray-500"><span class="font-bold">Correo:</span> ${contacto.email}</p>
        <p class="text-sm text-gray-500"><span class="font-bold">Mensaje:</span> ${contacto.mensaje}</p>
    </div>
  `;

  registrosTabla.appendChild(row);
  registrosLista.appendChild(rowLista);
}

registros.forEach((contacto) => {
  agregarFila(contacto);
});
