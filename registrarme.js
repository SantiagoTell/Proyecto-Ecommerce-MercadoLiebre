// Registro
const formRegistro = document.getElementById(`formRegistro`);
const usuarioElement = document.getElementById(`usuario`);
const emailElement = document.getElementById(`email`);
const contraseniaElement = document.getElementById(`contrasenia`);
const provinciaElement = document.getElementById(`provincia`);
const codigoPostalElement = document.getElementById(`codigoPostal`);
const localidadElement = document.getElementById(`localidad`);
const calleElement = document.getElementById(`calle`);
// Login
const formLogin = document.getElementById(`login`);
const correoLoginElement = document.getElementById(`correoLogin`)
const contrasenaLoginElement = document.getElementById(`contrasenaLogin`)

//Olvidé mi contraseña
function validarCorreoOlvideMiContrasena() {
    const htmlinputcontrasena = document.getElementById("emailOlvideContrasena");
    const expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const envioContrasena = expReg.test(htmlinputcontrasena.value);
    if (envioContrasena == true) {
        Swal.fire({
            icon: 'success',
            title: 'Listo',
            text: 'Se le envió una contraseña provisoria a su mail',
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo electrónico no es válido',
        });
    }
}

//Contraseña validación
function validarContrasenia(contrasenia) {
    const expReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    const esCorrecto = expReg.test(contrasenia);
    
    if (esCorrecto == false) {
        alert(`La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, un número.sad`)
        /* Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, un número.',
        }); */
    }
}
// E-mail validación
function validarCorreo(email) {
    const expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const esValido = expReg.test(email);
    if (!esValido) {
        alert(`El correo electrónico no es válido`);
     /*    Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo electrónico no es válido',
        }); */
    }
}
// Formulario de registro.
const guardar = JSON.parse(localStorage.getItem(`guardar`)) || [];
formRegistro.onsubmit = (event) => {
    event.preventDefault();
    const usuario = usuarioElement.value;
    const email = emailElement.value;
    const contrasenia = contraseniaElement.value;
    const provincia = provinciaElement.value;
    const codigoPostal = codigoPostalElement.value;
    const localidad = localidadElement.value;
    const calle = calleElement.value;
    validarCorreo(email);
    validarContrasenia(contrasenia);

    guardar.push({
        usuario,
        email,
        contrasenia,
        provincia,
        codigoPostal,
        localidad,
        calle,
        id: Date.now(),
        suspendido: false,
        rol: `client`,
    })
    localStorage.setItem(`guardar`, JSON.stringify(guardar));
    Swal.fire({
        icon: 'success',
        title: 'Registro completado.',
        text: 'Bienvenido a Mercado Liebre.',
    });
    formRegistro.reset();
}
// Login
/* formLogin.onsubmit = (event) => {
    event.preventDefault();
    const correoLoginElement = correoLoginElement.value;
    const contrasenaLoginElement = contrasenaLoginElement.value;
} */
/* const clienteRegistrado = guardar.find((u) => guardar.email === correo && guardar.contrasenia === contrasena);
if (!clienteRegistrado) {
   return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tu contraseña y/o correo electrónico no son válidos',
      })
} else {
    setTimeout(() => {
        window.location.href = '/.index.html';
    }, 1000)
} */

