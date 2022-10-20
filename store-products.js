// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const usersDOM = document.querySelector('.users-center');
const productsSection = document.querySelector('.products');
const usersSection = document.querySelector('.users');

const btnShowUsers = document.querySelector('.btnShowUsers');
const btnShowProducts = document.querySelector('.btnShowProducts');

const btnNewProduct = document.querySelector('.btnNewProduct');
const nombrePro = document.querySelector('#nombrePro');
const precioPro = document.querySelector('#precioPro');
const imagenPro = document.querySelector('#imagenPro');
const stockPro = document.querySelector('#stockPro');
const descriPro = document.querySelector('#descriPro');

const btnEditProduct = document.querySelector('.btnEditProduct');
const idProE = document.querySelector('#idProE');
const nombreProE = document.querySelector('#nombreProE');
const precioProE = document.querySelector('#precioProE');
const imagenProE = document.querySelector('#imagenProE');
const stockProE = document.querySelector('#stockProE');
const descriProE = document.querySelector('#descriProE');

const btnNewUser = document.querySelector('.btnNewUser');
const usuarioUser = document.querySelector('#usuarioUser');
const emailUser = document.querySelector('#emailUser');
const contraseniaUser = document.querySelector('#contraseniaUser');
const provinciaUser = document.querySelector('#provinciaUser');
const codigopostalUser = document.querySelector('#codigopostalUser');
const localidadUser = document.querySelector('#localidadUser');
const calleUser = document.querySelector('#calleUser');
const rolUser = document.querySelector('#rolUser');

const btnEditUser = document.querySelector('.btnEditUser');
const idUserE = document.querySelector('#idUserE');
const usuarioUserE = document.querySelector('#usuarioUserE');
const emailUserE = document.querySelector('#emailUserE');
const contraseniaUserE = document.querySelector('#contraseniaUserE');
const provinciaUserE = document.querySelector('#provinciaUserE');
const codigopostalUserE = document.querySelector('#codigopostalUserE');
const localidadUserE = document.querySelector('#localidadUserE');
const calleUserE = document.querySelector('#calleUserE');
const rolUserE = document.querySelector('#rolUserE');

const btnDeleteProduct = document.querySelector('.delete-btn');
const btnStatusProduct = document.querySelector('.status-btn');

const proSearch = document.querySelector('#proSearch');
const btnSearchProducts = document.querySelector('#btnSearchProducts');
const btnSearchClear = document.querySelector('#btnSearchClear');

const btnProductInfo = document.querySelector('.btnProductInfo');
const productsInfoDOM = document.querySelector('.productInfo-center');
const productInfo = document.querySelector('.productInfo');

const btnBack = document.querySelector('#btnBack');

const btnPanelControl = document.querySelector('.btnPanelControl');

const btnMenuProduct = document.querySelector('.btnMenuProduct');

// const forms = document.querySelectorAll('.needs-validation')

// cart
let cart = [];
// buttons
let buttonsDOM = [];

let loginAdmin = JSON.parse(localStorage.getItem('isAdmin'));

// getting the products
class Products {
  constructor(product_name, product_price, product_image, product_stock, product_description) {
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_id = this.getPid;
    this.product_image = product_image;
    this.product_stock = product_stock;
    this.product_description = product_description;
    this.product_status = true;
  }

  get getPid() {
    return pid++;
  }

  async getProducts() {
    try {
      let result = await fetch('store.json')
      let data = await result.json();
      let products = data.items;

      products = products.map(item => {
        const { product_name, product_price, product_id, product_image, product_stock, product_description, product_status } = item;
        return { product_name, product_price, product_id, product_image, product_stock, product_description, product_status };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// getting the products
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

// display products
class UI {

  setProduct() {
    btnNewProduct.addEventListener('click', () => {
      const pro = new Products(nombrePro.value, parseInt(precioPro.value), imagenPro.value, parseInt(stockPro.value), descriPro.value);
      Storage.newProduct(pro);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto creado con exito!!!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    }, false)
  }

  setUser() {
    btnNewUser.addEventListener('click', () => {
      const user = new Users(usuarioUser.value, emailUser.value, contraseniaUser.value, provinciaUser.value, codigopostalUser.value, localidadUser.value, calleUser.value, rolUser.value);
      Storage.newUser(user);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario creado con exito!!!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    }, false)
  }

  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      if (!product.hasOwnProperty('product_delete')) {
        result += `
        <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img src=${product.product_image} alt="product" class="product-img"/>
            <button ${loginAdmin ? "class='bag-btn d-none'" : "class='bag-btn'"} data-id=${product.product_id}>
              ${product.product_stock === 0 ? "SIN STOCK" : "<i class='fas fa-shopping-cart'></i>Agregar al carro"}
            </button>
            <div ${loginAdmin ? "class='btnMenuProduct'" : "class='btnMenuProduct d-none'"}>
              <button type="button" class="edit-btn btn btn-warning m-1" data-id=${product.product_id} data-bs-toggle="modal" data-bs-target="#ModalEditProduct">
              <i class="fas fa-edit"></i>Editar
              </button>
              <button type="button" class="delete-btn btn btn-danger m-1" data-id=${product.product_id}>
              <i class="fas fa-trash"></i>Borrar
              </button>
              <button type="button" ${(product.product_status || !product.hasOwnProperty('product_status')) ? "class='status-btn btn btn-success m-1'" : "class='status-btn btn btn-secondary m-1'"} data-id=${product.product_id}>
              ${(product.product_status || !product.hasOwnProperty('product_status')) ? "<i class='fas fa-fire'></i>Publicado" : "<i class='fas fa-fire'></i>No Publicado"}
              </button>
            </div>
          </div>
          <h2>${product.product_name}</h2>
          <p>${product.product_description}</p>
          <h5>${product.product_stock}</h5>
          <h4>$${product.product_price}</h4>
          <h5>${product.product_delete}</h5>
          <h5>${product.product_status}</h5>
          <button type="button" ${loginAdmin ? "class='btnProductInfo btn btn-info m-2 d-none'" : "class='btnProductInfo btn btn-info m-2'"}data-id=${product.product_id}>
          <i class="fas fa-info me-2"></i>Más Info</button>
        </article>
        <!-- end of single product -->
        `;
      }
    });
    productsDOM.innerHTML = result;
  }

  displayUsers(users) {
    let result = '';
    users.forEach(user => {
      if (!user.hasOwnProperty('user_delete')) {
        result += `
        <!-- single user -->
        <article class="user">

          <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o=" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <button type="button" class="user-edit-btn btn btn-warning m-1" data-id=${user.id} data-bs-toggle="modal" data-bs-target="#ModalEditUser">
                <i class="fas fa-edit"></i>Editar
                </button>
                <button type="button" class="user-delete-btn btn btn-danger m-1" data-id=${user.id}>
                <i class="fas fa-trash"></i>Borrar
                </button>
                <button type="button" ${(!user.suspendido || user.hasOwnProperty('user.suspendido')) ? "class='user-status-btn btn btn-success m-1'" : "class='user-status-btn btn btn-secondary m-1'"} data-id=${user.id}>
                ${(!user.suspendido || user.hasOwnProperty('user.suspendido')) ? "<i class='fas fa-fire'></i>Activo" : "<i class='fas fa-fire'></i>Suspendido"}
                </button>
                  <div class="card-body">
                    <h4 class="card-title">${user.usuario}</h4>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text">${user.contrasenia}</p>
                    <p class="card-text">${user.provincia}</p>
                    <p class="card-text">${user.codigoPostal}</p>
                    <p class="card-text">${user.localidad}</p>
                    <p class="card-text">${user.calle}</p>
                    <p class="card-text">${user.id}</p>
                    <p class="card-text">${user.suspendido}</p>
                    <p class="card-text">${user.rol}</p>
                  </div>
                </div>
              </div>
            </div>
        </article>
        <!-- end of single user -->
        `;
      }
    });
    usersDOM.innerHTML = result;
  }

  getEditButtons() {
    const buttons = [...document.querySelectorAll(".edit-btn")];
    buttons.forEach(button => {
      let id = button.dataset.id;

      const itemTemp = Storage.getProduct(id);
      button.addEventListener('click', () => {
        idProE.value = itemTemp.product_id;
        nombreProE.value = itemTemp.product_name;
        precioProE.value = itemTemp.product_price;
        imagenProE.value = itemTemp.product_image;
        stockProE.value = itemTemp.product_stock;
        descriProE.value = itemTemp.product_description;
      });
    });
  }

  setEditProduct() {
    btnEditProduct.addEventListener('click', () => {
      let id = parseInt(idProE.value);
      const products = Storage.getLoadProduct();

      const product_name = nombreProE.value;
      const product_price = parseInt(precioProE.value);
      const product_image = imagenProE.value;
      const product_stock = parseInt(stockProE.value);
      const product_description = descriProE.value;

      const updateProduct = products.map((producto) => (
        (producto.product_id === id) ? { ...producto, product_name, product_price, product_image, product_stock, product_description } : producto
      ))

      Storage.saveProducts(updateProduct);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto editado con exito!!!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    }, false)
  }

  getEditUserButtons() {
    const buttons = [...document.querySelectorAll(".user-edit-btn")];
    buttons.forEach(button => {
      let id = button.dataset.id;

      const userTemp = Storage.getUser(id);
      button.addEventListener('click', () => {
        idUserE.value = userTemp.id;
        usuarioUserE.value = userTemp.usuario;
        emailUserE.value = userTemp.email;
        contraseniaUserE.value = userTemp.contrasenia;
        provinciaUserE.value = userTemp.provincia;
        codigopostalUserE.value = userTemp.codigoPostal;
        localidadUserE.value = userTemp.localidad;
        calleUserE.value = userTemp.calle;
        rolUserE.value = userTemp.rol;
      });
    });
  }

  setEditUser() {
    btnEditUser.addEventListener('click', () => {
      let id = parseInt(idUserE.value);
      const users = Storage.getLoadUser();

      const usuario = usuarioUserE.value
      const email = emailUserE.value
      const contrasenia = contraseniaUserE.value
      const provincia = provinciaUserE.value
      const codigoPostal = codigopostalUserE.value
      const localidad = localidadUserE.value
      const calle = calleUserE.value
      const rol = rolUserE.value

      const updateUsers = users.map((user) => (
        (user.id === id) ? { ...user, usuario, email, contrasenia, provincia, codigoPostal, localidad, calle, rol } : user
      ))

      Storage.saveUsers(updateUsers);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario editado con exito!!!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        location.reload();
      }, 1500);
    }, false)
  }

  deleteProduct() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let dateNow = 0;

    month < 10 ? dateNow = `${day}-0${month}-${year}` : dateNow = `${day}-${month}-${year}`;

    const buttons = [...document.querySelectorAll(".delete-btn")];
    const products = Storage.getLoadProduct();
    buttons.forEach(button => {
      let id = button.dataset.id;

      const itemTemp = Storage.getProduct(id);
      button.addEventListener('click', () => {
        itemTemp.product_delete = dateNow;
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            products.splice(--id, 1, itemTemp);
            Storage.saveProducts(products);
            setTimeout(() => {
              document.location.reload();
            }, 1000);
          }
        })
      });
    });
  }

  deleteUser() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let dateNow = 0;

    month < 10 ? dateNow = `${day}-0${month}-${year}` : dateNow = `${day}-${month}-${year}`;

    const buttons = [...document.querySelectorAll(".user-delete-btn")];
    const users = Storage.getLoadUser();
    buttons.forEach(button => {
      let id = button.dataset.id;

      const userTemp = Storage.getUser(id);
      button.addEventListener('click', () => {
        userTemp.user_delete = dateNow;
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            // users.splice(--id, 1, userTemp);
            const updateUsers = users.map((user) => (
              (user.id === parseInt(id)) ? userTemp : user
            ));
            Storage.saveUsers(updateUsers);
            setTimeout(() => {
              document.location.reload();
            }, 1000);
          }
        })
      });
    });
  }

  statusProduct() {
    const buttons = [...document.querySelectorAll(".status-btn")];
    const products = Storage.getLoadProduct();

    buttons.forEach(button => {
      let id = button.dataset.id;

      const itemTemp = Storage.getProduct(id);
      button.addEventListener('click', () => {
        if (!itemTemp.hasOwnProperty('product_status') || !itemTemp.product_status) {
          itemTemp.product_status = true;
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Disponible!',
                'Your file has been deleted.',
                'success'
              )
              products.splice(--id, 1, itemTemp);
              Storage.saveProducts(products);
              setTimeout(() => {
                document.location.reload();
              }, 1000);
            }
          })
        } else {
          itemTemp.product_status = false;
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'No Disponible!',
                'Your file has been deleted.',
                'success'
              )
              products.splice(--id, 1, itemTemp);
              Storage.saveProducts(products);
              setTimeout(() => {
                document.location.reload();
              }, 1000);
            }
          })
        }
      });
    });
  }

  statusUser() {
    const buttons = [...document.querySelectorAll(".user-status-btn")];
    const users = Storage.getLoadUser()

    buttons.forEach(button => {
      let id = button.dataset.id;

      const userTemp = Storage.getUser(id);
      button.addEventListener('click', () => {
        if (!userTemp.hasOwnProperty('suspendido') || userTemp.suspendido) {
          userTemp.suspendido = false;
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Disponible!',
                'Your file has been deleted.',
                'success'
              )
              // users.splice(--id, 1, userTemp);
              const updateUsers = users.map((user) => (
                (user.id === parseInt(id)) ? userTemp : user
              ));
              Storage.saveUsers(updateUsers);
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          })
        } else {
          userTemp.suspendido = true;
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'No Disponible!',
                'Your file has been deleted.',
                'success'
              )
              // users.splice(--id, 1, userTemp);
              const updateUsers = users.map((user) => (
                (user.id === parseInt(id)) ? userTemp : user
              ));
              Storage.saveUsers(updateUsers);
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          })
        }
      });
    });
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      // let inCart = cart.find(item => {
      //   if (item.product_id === parseInt(id)){
      //     return true;
      //   }
      // });
      let inCart = cart.find(item => item.product_id.toString() === id);
      let itemTemp = Storage.getProduct(id);

      if (inCart) {
        button.innerText = "En el carro";
        button.disabled = true
      } else if (itemTemp.product_stock > 0) {
        button.addEventListener('click', event => {
          event.target.innerText = "En el carro";
          event.target.disabled = true;
          // get product from products
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          // add product to the cart
          cart = [...cart, cartItem];
          // save cart in local storage
          Storage.saveCart(cart);
          // set cart values
          this.setCartValues(cart);
          // display cart item
          this.addCartItem(cartItem);
          // show the cart
          this.showCart();
        })
      }
      // if(itemTemp.product_stock === 0) {
      //   button.addEventListener('click', event => {
      //     event.target.innerText = "Sin stock";
      //     event.target.disabled = true;
      //   })
      // }
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.product_price * item.amount;
      itemsTotal += item.amount
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML =
      `
      <img src=${item.product_image} alt="product">
      <div>
        <h4>${item.product_name}</h4>
        <h6>Stock: ${item.product_stock}</h6>
        <h5>$${item.product_price}</h5>
        <span class="remove-item" data-id=${item.product_id}>Quitar del carro</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.product_id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.product_id}></i>
      </div>
    `;
    cartContent.appendChild(div);
  }
  showProducts() {
    usersSection.classList.add('d-none');
    productsSection.classList.remove('d-none');

  }
  showUsers() {
    productsSection.classList.add('d-none');
    usersSection.classList.remove('d-none');
  }
  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  showProductInfo() {
    const buttons = [...document.querySelectorAll(".btnProductInfo")];
    // const products = Storage.getLoadProduct();
    buttons.forEach(button => {
      let id = button.dataset.id;
      const itemTemp = Storage.getProduct(id);
      let result = '';
      button.addEventListener('click', () => {
        productsSection.classList.add('d-none');
        usersSection.classList.add('d-none');
        productInfo.classList.remove('d-none');
        result = `
        <div class="card mb-3 w-75 m-auto">
          <img src="${itemTemp.product_image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${itemTemp.product_name}</h5>
            <p class="card-text">${itemTemp.product_description}</p>
            <p class="card-text"><small class="text-muted">$${itemTemp.product_price}</small></p>
          </div>
        </div>
        `;
        productsInfoDOM.innerHTML = result;
      });
    });
  }
  searchProducts() {
    const products = Storage.getLoadProduct();
    let productSearch = proSearch.value;
    const productFilter = products.filter(product => product.product_name === productSearch);
    Storage.saveProductsFilter(productFilter);
  }
  searchClear() {
    localStorage.removeItem('productsFilter');
  }
  back() {
    location.reload();
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    this.setProduct();
    this.setUser();
    this.setEditProduct();
    this.setEditUser();
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
    btnShowProducts.addEventListener('click', this.showProducts);
    btnShowUsers.addEventListener('click', this.showUsers);
    btnSearchProducts.addEventListener('click', this.searchProducts);
    btnSearchClear.addEventListener('click', this.searchClear);
    btnBack.addEventListener('click', this.back);
  }
  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
  cartLogic() {
    // clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener('click', event => {
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      }
      else if (event.target.classList.contains('fa-chevron-up')) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.product_id.toString() === id);
        // tempItem.amount = tempItem.amount + 1;
        tempItem.amount++;
        if (tempItem.amount <= tempItem.product_stock) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          addAmount.nextElementSibling.innerText = tempItem.amount;
        } else {
          tempItem.amount--;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay stock!',
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      }
      else if (event.target.classList.contains('fa-chevron-down')) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.product_id.toString() === id);
        // tempItem.amount = tempItem.amount - 1;
        tempItem.amount--;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        }
        else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    })
  }
  clearCart() {
    let cartItems = cart.map(item => item.product_id.toString());
    cartItems.forEach(id => this.removeItem(id));
    console.log("carrito vacio: ", cartContent.children);

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0])
    }
    this.hideCart();
  }
  removeItem(id) {
    cart = cart.filter(item => item.product_id.toString() !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);

    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>agregar al carro`;
  }
  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
  }
}

// local storage
class Storage {
  static newProduct(product) {
    let products = this.getLoadProduct();
    products.push(product);
    this.saveProducts(products);
  }
  static newUser(user) {
    let users = this.getLoadUser();
    users.push(user);
    this.saveUsers(users);
  }
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static saveProductsFilter(products) {
    localStorage.setItem("productsFilter", JSON.stringify(products));
  }
  static saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  static getLoadProduct() {
    return JSON.parse(localStorage.getItem('products'));
  }
  static getLoadProductFilter() {
    return JSON.parse(localStorage.getItem('productsFilter'));
  }
  static getLoadUser() {
    return JSON.parse(localStorage.getItem('users'));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.product_id.toString() === id);
  }
  static getUser(id) {
    let users = JSON.parse(localStorage.getItem('users'));
    return users.find(user => user.id.toString() === id);
  }
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  const users = new Users();



  let storageProducts;
  let storageUsers = Storage.getLoadUser();

  (Storage.getLoadProductFilter()) ? storageProducts = Storage.getLoadProductFilter() : storageProducts = Storage.getLoadProduct();

  

  // setup app
  ui.setupAPP();

  // get all products
  if (!storageProducts) {
    products.getProducts().then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    }).then(() => {
      ui.getBagButtons();
      ui.cartLogic();
      ui.getEditButtons();
      ui.deleteProduct();
      ui.statusProduct();
      ui.showProductInfo();
    });
  } else {
    ui.displayProducts(storageProducts);
    ui.getBagButtons();
    ui.cartLogic();
    ui.getEditButtons();
    ui.deleteProduct();
    ui.statusProduct();
    ui.showProductInfo();
  }

  // get all users
  if (!storageUsers) {
    users.getUsers().then(users => {
      ui.displayUsers(users);
      Storage.saveUsers(users);
    }).then(() => {
      // ui.getBagButtons();
      // ui.cartLogic();
      ui.getEditUserButtons();
      ui.deleteUser();
      ui.statusUser();
    });
  } else {
    ui.displayUsers(storageUsers);
    // ui.getBagButtons();
    // ui.cartLogic();
    ui.getEditUserButtons();
    ui.deleteUser();
    ui.statusUser();
  }

  if(loginAdmin) {
    btnPanelControl.classList.remove("d-none");
    cartBtn.classList.add("d-none");
  } else {
    btnPanelControl.classList.add("d-none");
    cartBtn.classList.remove("d-none");
  }

});

// id Products ---(50 indico por defecto por que es la cantidad de product que estan en el JSON)
let pid
(Storage.getLoadProduct()) ? pid = Storage.getLoadProduct().length : pid = 20;
console.log("idProducto: ", pid);