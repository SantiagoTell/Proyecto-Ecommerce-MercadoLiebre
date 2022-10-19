import {guardar,formRegistro} from "./registrarme.js";
localStorage.setItem(`guardar`, JSON.stringify(guardar));
localStorage.setItem(`usuarioLogueado`, JSON.stringify(guardar))

const mostrarLogueo = document.querySelector(`#mostrarLogueo`)
if (!usuarioLogueado) {
    mostrarLogueo.innerHTML = `
    /* <button class="btn btn-outline-light m-1" type="submit"> Entrar</button>
<button class="btn btn-outline-light" type="submit"> Registrarme</button> */
`; 
}