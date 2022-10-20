// Registro
const formRegistro = document.getElementById(`formRegistro`);
const usuarioElement = document.getElementById(`usuario`);
const emailElement = document.getElementById(`email`);
const contraseniaElement = document.getElementById(`contrasenia`);
const provinciaElement = document.getElementById(`provincia`);
const codigoPostalElement = document.getElementById(`codigoPostal`);
const localidadElement = document.getElementById(`localidad`);
const calleElement = document.getElementById(`calle`);
const emailYaRegistradoElement = document.getElementById(`emailYaRegistrado`);


const isUser = JSON.parse(localStorage.getItem(`user`));
const isAdmin = JSON.parse(localStorage.getItem(`isAdmin`));

if (isUser || isAdmin) {
        window.location.href = './index.html';
}


class Users {
    constructor(usuario, email, contrasenia, provincia, codigoPostal, localidad, calle, rol) {
        this.usuario = usuario;
        this.email = email;
        this.contrasenia = contrasenia;
        this.provincia = provincia;
        this.codigoPostal = codigoPostal;
        this.localidad = localidad;
        this.calle = calle;
        this.rol = rol;
        this.id = this.getUid;
        this.suspendido = false;
    }

    get getUid() {
        return Date.now();
    }

    async getUsers() {
        try {
            let result = await fetch('store.json')
            let data = await result.json();
            let users = data.users;

            users = users.map(user => {
                const { usuario, email, contrasenia, provincia, codigoPostal, localidad, calle, id, suspendido, rol } = user;
                return { usuario, email, contrasenia, provincia, codigoPostal, localidad, calle, id, suspendido, rol };
            });
            return users;
        } catch (error) {
            console.log(error);
        }
    }
}


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

let storageUsers = JSON.parse(localStorage.getItem('users'));

if (!storageUsers) {
    const users = new Users();
    
    users.getUsers().then(users => {
        localStorage.setItem("users", JSON.stringify(users))
    });
}

// Formulario de registro.
let guardar = JSON.parse(localStorage.getItem('users')) || [];
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
    
    if (validarCorreo(email) && validarContrasenia(contrasenia)) {
        guardar = JSON.parse(localStorage.getItem('users'))
        //html
    
    
        guardar.push({
            usuario,
            email,
            contrasenia,
            provincia,
            codigoPostal,
            localidad,
            calle,
            rol: `client`,
            id: Date.now(),
            suspendido: false,
        })
        /*  const datosAGuardar = {
             rol: `client`,
             usuario,
             email,
             contrasenia,
             provincia,
             codigoPostal,
             localidad,
             calle,
             id: Date.now(),
             suspendido: false,    
         }
         localStorage.setItem('usuarioRegistrados',JSON.stringify(datosAGuardar)); */
        localStorage.setItem('users', JSON.stringify(guardar));

        Swal.fire({
            icon: 'success',
            title: 'Registro completado.',
            text: 'Bienvenido a Mercado Liebre.',
        });
        // redirección
        setTimeout(() => {
            window.location.href = './index.html';
        }, 1000)
    }


    formRegistro.reset();
}




