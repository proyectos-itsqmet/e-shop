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

const inputNombres = document.getElementById("nombres");
const inputApellidos = document.getElementById("apellidos");
const inputCelular = document.getElementById("celular");
const inputCorreo = document.getElementById("email");
const inputDireccion = document.getElementById("direccion");
const inputContrasena = document.getElementById("contrasena");
const inputConfirmarContrasena = document.getElementById("confirmarContrasena");

const errorNombres = document.getElementById("erroNombres");
const errorApellidos = document.getElementById("errorApellidos");
const errorCelular = document.getElementById("errorCelular");
const errorCorreo = document.getElementById("errorEmail");
const errorDireccion = document.getElementById("errorDireccion");
const errorContrasena = document.getElementById("errorContrasena");
const errorConfirmarContrasena = document.getElementById(
  "errorConfirmarContrasena"
);

const btnEnviar = document.getElementById("botonEnviar");

const envioExitoso = document.getElementById("envioExitoso");

const formulario = document.getElementById("formularioRegistro");

//! Validar Nombres
const validarNombres = () => {
  const nombre = inputNombres.value.trim();
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (nombre === "") {
    errorNombres.textContent = "El nombre es obligatorio";
    return false;
  } else if (!regexNombre.test(nombre)) {
    errorNombres.textContent = "Solo se permiten letras y espacios";
    return false;
  } else {
    errorNombres.textContent = "";
    return true;
  }
};

//! Validar Apellidos
const validarApellidos = () => {
  const apellido = inputApellidos.value.trim();
  const regexApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (apellido === "") {
    errorApellidos.textContent = "El apellido es obligatorio";
    return false;
  } else if (!regexApellido.test(apellido)) {
    errorApellidos.textContent = "Solo se permiten letras y espacios";
    return false;
  } else {
    errorApellidos.textContent = "";
    return true;
  }
};

//! Validar Celular
const validarCelular = () => {
  const regexCelular = /^\d{9}$/;

  if (!regexCelular.test(inputCelular.value)) {
    errorCelular.textContent = "Ingrese un número válido de 9 dígitos";

    return false;
  } else {
    errorCelular.textContent = "";

    return true;
  }
};

//! Validar eMail
const validarEmail = () => {
  const regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  if (!regexEmail.test(inputCorreo.value)) {
    errorCorreo.textContent = "Ingrese un correo valido";

    return false;
  } else {
    errorCorreo.textContent = "";

    return true;
  }
};

//! Validar Direccion
const validarDireccion = () => {
  if (inputDireccion.value.trim() === "") {
    errorDireccion.textContent = "El nombre es obligatorio";

    return false;
  } else {
    errorDireccion.textContent = "";

    return true;
  }
};

//! Validar Contraseña
const validarContrasena = () => {
  const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regexContrasena.test(inputContrasena.value)) {
    errorContrasena.textContent =
      "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número, sin caracteres especiales.";

    return false;
  } else {
    errorContrasena.textContent = "";

    return true;
  }
};

//! Validar Confirmar contraseña
const validarConfirmarContrasena = () => {
  const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const contrasena = inputContrasena.value;
  const confirmar = inputConfirmarContrasena.value;

  if (!regexContrasena.test(contrasena)) {
    errorConfirmarContrasena.textContent =
      "La contraseña no cumple con los requisitos mínimos.";

    return false;
  }

  if (contrasena !== confirmar) {
    errorConfirmarContrasena.textContent = "Las contraseñas no coinciden.";

    return false;
  }

  errorConfirmarContrasena.textContent = "";

  return true;
};

//! Validar formulario
const validarFormulario = () => {
  const nombresValidos = validarNombres();
  const apellidosValidos = validarApellidos();
  const celularValido = validarCelular();
  const emailValido = validarEmail();
  const direccionValido = validarDireccion();
  const contrasenaValido = validarContrasena();
  const confirmarContrasenaValido = validarConfirmarContrasena();

  if (
    nombresValidos &&
    apellidosValidos &&
    celularValido &&
    emailValido &&
    direccionValido &&
    contrasenaValido &&
    confirmarContrasenaValido
  ) {
    btnEnviar.disabled = false;
  } else {
    btnEnviar.disabled = true;
  }
};

//! Manejo de errores
inputNombres.addEventListener("input", () => {
  validarNombres();
  validarFormulario();
});

inputApellidos.addEventListener("input", () => {
  validarApellidos();
  validarFormulario();
});

inputCelular.addEventListener("input", () => {
  validarCelular();
  validarFormulario();
});

inputCorreo.addEventListener("input", () => {
  validarEmail();
  validarFormulario();
});

inputDireccion.addEventListener("input", () => {
  validarDireccion();
  validarFormulario();
});

inputContrasena.addEventListener("input", () => {
  validarContrasena();
  validarFormulario();
});

inputConfirmarContrasena.addEventListener("input", () => {
  validarConfirmarContrasena();
  validarFormulario();
});

const agregarUsuario = async (
  nombres,
  apellidos,
  celular,
  correo,
  direccion,
  contrasena
) => {
  try {
    btnEnviar.disabled = true;
    envioExitoso.textContent = "Enviando...";

    await db
      .collection("usuarios")
      .add({ nombres, apellidos, celular, correo, direccion, contrasena });

    envioExitoso.textContent = "Datos enviados con exito";

    formulario.reset();
    inputNombres.classList.remove("valido");
    inputApellidos.classList.remove("valido");
    inputCelular.classList.remove("valido");
    inputCorreo.classList.remove("valido");
    inputDireccion.classList.remove("valido");
    inputContrasena.classList.remove("valido");
    inputConfirmarContrasena.classList.remove("valido");
    btnEnviar.disabled = true;
  } catch (error) {
    btnEnviar.disabled = false;
    envioExitoso.textContent = "Error al registrar el usuario";
    console.log(`Error al agregar producto: ${error}`);
  }
};

formulario.addEventListener("submit", (event) => {
  event.preventDefault(); //! Detiene el comportamiento automatico del form
  const nombres = inputNombres.value.trim();
  const apellidos = inputApellidos.value.trim();
  const celular = inputCelular.value.trim();
  const correo = inputCorreo.value.trim();
  const direccion = inputDireccion.value.trim();
  const contrasena = inputContrasena.value.trim();

  agregarUsuario(nombres, apellidos, celular, correo, direccion, contrasena);
});
