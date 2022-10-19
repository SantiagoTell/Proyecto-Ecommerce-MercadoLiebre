const user = JSON.parse(localStorage.getItem(`user`));
console.log(user);
const mostrarLogueo = document.querySelector(`#mostrarLogueo`);
if (!user) {
    mostrarLogueo.innerHTML = `
     <button class="btn btn-outline-light m-1" type="submit">
      <a href="./login.html"> Entrar </a>
    </button>
     <button class="btn btn-outline-light" type="submit"><a href="./registrarme.html"> Registrarme</a>
    </button> 
`;
} else {
    mostrarLogueo.innerHTML = `
    <div class="btn-group">
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa-solid fa-bell"></i>
  </button>
  <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">50% de descuentos</a></li>
      <li><a class="dropdown-item" href="#">¡Super oferta sólo por hoy!</a></li>
  </ul>
</div>
<div class="btn-group">
  <button class="btn btn-secondary btn-sm" type="button">
  <i class="fa-solid fa-paw">${user.usuario}</i>
  </button>
  <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
      
      <li><a class="dropdown-item" onclick="cerrarSeccion()">cerrar sección</a></li>
  </ul>
</div>
`;
}




const cerrarSeccion = () => {
    localStorage.removeItem(`user`);
    setTimeout(() => {
        location.reload();
    }, 1000);
}