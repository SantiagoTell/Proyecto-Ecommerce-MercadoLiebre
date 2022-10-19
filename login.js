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
// Login
formLogin.onsubmit = (event) => {
    event.preventDefault();
    let guardar = JSON.parse(localStorage.getItem("guardar")) || []
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
    } else if(clienteRegistrado.role === admin) {
        localStorage.setItem('administrador', JSON.stringify(clienteRegistrado));
        setTimeout(() => {
            window.location.href = './store-products.html';
        }, 1000)
    }  else {
        localStorage.setItem(`usuarioLogueado`, JSON.stringify(guardar))
        setTimeout(() => {
            window.location.href = './index.html';
        }, 1000)
    }
}
