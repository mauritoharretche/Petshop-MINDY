
let contenedorCarrito = document.getElementById("bodyTable")
let productos;
let carrito = (JSON.parse(localStorage.getItem('carrito')));
let total = document.getElementById("totalProductos")

async function getId() {
  try {
    var dataApi = await (await fetch('https://apipetshop.herokuapp.com/api/articulos ')).json()
    console.log(dataApi);
  } catch (error) {
    console.log(error);
  }
  let api = dataApi.response

  productos = api.filter(producto => carrito.includes(producto._id))
  console.log(productos);

  productos.forEach(imprProducto)
  let a = productos.reduce((a,b) => a+=b.precio,0)
  total.innerHTML = `Total :  ${a} `
}

getId()


function imprProducto(product) {
  contenedorCarrito.innerHTML += `
    <td scope="row" id="${product._id}">🟢</td>
    <td class="table__productos">${product.nombre}</td> 
    <td> <img src = "${product.imagen}" alt = "" style = "width: 8rem; "></img>  </td>
    <td class="table__precio">$${product.precio}</td>
        <td class="table__cantidad">
            <input type="number" min="1" value="1" >
            <botton class="delete btn btn-danget"  onclick = "agregarCarrito('${product._id}')">x</botton> 
        </td>
      </tr> 
      `
}


function impresora(carrito) {
  contenedorCarrito.innerHTML = ''
  let a = carrito.reduce((a,b) => a+=b.precio,0)
  total.innerHTML = `Total :  ${a} `
  if (carrito.length > 0){
    carrito.forEach(imprProducto)
    total(carrito,total)
  } else {
    contenedorCarrito.innerHTML = `<h2> No hay productos seleccionados</h2>`
  }
}



function agregarCarrito(id) {
  if (carrito.includes(id)) {
    let a = JSON.parse(localStorage.getItem("carrito"))
    carrito = a.filter(element => element !== id)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito);
    productos = productos.filter(producto => carrito.includes(producto._id))
    impresora(productos)
  } else {
    let a = JSON.parse(localStorage.getItem("carrito"))
    if (a) {
      a.push(id)
      localStorage.setItem('carrito', JSON.stringify(a))
      productos = productos.filter(producto => carrito.includes(producto._id))
      console.log(carrito);
      impresora(productos)
    }
    else {
      carrito.push(id)
      localStorage.setItem('carrito', JSON.stringify(carrito))
      console.log(carrito);
      productos = productos.filter(producto => carrito.includes(producto._id))
      console.log(carrito);
      impresora(productos)
    }
  }
}










