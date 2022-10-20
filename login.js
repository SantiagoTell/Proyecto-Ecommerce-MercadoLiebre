// Login
const formLogin = document.getElementById(`login`);
const correoLoginElement = document.getElementById(`correoLogin`)
const contrasenaLoginElement = document.getElementById(`contrasenaLogin`)

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

let storageUsers = JSON.parse(localStorage.getItem('users'));

if (!storageUsers) {
    const users = new Users();
    
    users.getUsers().then(users => {
        localStorage.setItem("users", JSON.stringify(users))
    });
}

// Login
formLogin.onsubmit = (event) => {
    event.preventDefault();
    let guardar = JSON.parse(localStorage.getItem("users")) || []
    let correo = correoLoginElement.value;
    let contrasena = contrasenaLoginElement.value;
    let admin = `admin`;
    let clienteRegistrado = guardar.find((u) => u.email === correo && u.contrasenia === contrasena);
    if (!clienteRegistrado) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tu contraseña y/o correo electrónico no son válidos',
          })
    } else if(clienteRegistrado.rol === admin) {
        localStorage.setItem('isAdmin', JSON.stringify(clienteRegistrado));
        setTimeout(() => {
            window.location.href = './store-products.html';
        }, 1000)
    }  else {
        localStorage.setItem(`user`, JSON.stringify(clienteRegistrado))
        setTimeout(() => {
            window.location.href = './index.html';
        }, 1000)
    }
}
