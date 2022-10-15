// Registro
const formRegistro = document.getElementById(`formRegistro`);
const usuarioElement = document.getElementById(`usuario`);
const emailElement = document.getElementById(`email`);
const contraseniaElement = document.getElementById(`contrasenia`);
const provinciaElement = document.getElementById(`provincia`);
const codigoPostalElement = document.getElementById(`codigoPostal`);
const localidadElement = document.getElementById(`localidad`);
const calleElement = document.getElementById(`calle`);




//Contraseña validación
function validarContrasenia(contrasenia) {
    const expReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    const esCorrecto = expReg.test(contrasenia);
    
    if (esCorrecto == false) {
        // alert(`La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, un número.sad`)
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, un número.',
        }); 
    }
    return esCorrecto; //booleando , verdadero o falso
}
// E-mail validación
function validarCorreo(email) {
    const expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const esValido = expReg.test(email);
    if (!esValido) {
        // alert(`El correo electrónico no es válido`);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo electrónico no es válido',
        }); 
    }
    return esValido; //booleando , verdadero o falso
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
     validarCorreo(email); //verdadero si el correo esta bien, falso si no
    validarContrasenia(contrasenia);//verdadero si el correo esta bien, falso si no

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

    if(validarCorreo(email) && validarContrasenia(contrasenia))
    {
        Swal.fire({
            icon: 'success',
            title: 'Registro completado.',
            text: 'Bienvenido a Mercado Liebre.',
        });
    }

    formRegistro.reset();
}



