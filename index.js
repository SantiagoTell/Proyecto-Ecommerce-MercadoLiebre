const isUser = JSON.parse(localStorage.getItem(`user`));
const isAdmin = JSON.parse(localStorage.getItem(`isAdmin`));

const mostrarLogueo = document.querySelector(`#mostrarLogueo`);

if (!isUser && !isAdmin) {
  mostrarLogueo.innerHTML = `
<a href="./login.html"><button class="btn btn-outline-light me-1" type="submit">Entrar</button></a>
<a href="./registrarme.html"><button class="btn btn-outline-light" type="submit">Registrarme</button></a>
`;
} else if (isUser) {
  mostrarLogueo.innerHTML = `
    <div class="btn-group me-1">
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
  <i class="fa-solid fa-paw">${isUser.usuario}</i>
  </button>
  <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <a class="dropdown-item" onclick="cerrarSeccion()"><li>cerrar sección</li></a>
  </ul>
</div>
`;
} else {
  mostrarLogueo.innerHTML = `
  <div class="btn-group me-1">
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
<i class="fa-solid fa-paw">${isAdmin.usuario}</i>
</button>
<button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
  <span class="visually-hidden">Toggle Dropdown</span>
</button>
<ul class="dropdown-menu">
  <a class="dropdown-item" onclick="cerrarSeccion()"><li>cerrar sección</li></a>
</ul>
</div>
`;
}

const cerrarSeccion = () => {
  if (isUser) {
    localStorage.removeItem(`user`);
    setTimeout(() => {
      location.reload();
    }, 1000);
  } else {
    localStorage.removeItem(`isAdmin`);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}