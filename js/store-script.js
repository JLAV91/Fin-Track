// Arreglo de productos
const productos = [
    { id: 1, nombre: "Curso Finanzas Básicas", precio: 15000, img: "assets/img/Investiga.png" },
    { id: 2, nombre: "Guía de Presupuestos", precio: 10000, img: "assets/img/Presupuesta.png" },
    { id: 3, nombre: "Planificador Mensual", precio: 8000, img: "assets/img/Planifica.png" },
    { id: 4, nombre: "Asesoría Personalizada", precio: 25000, img: "assets/img/FinTrack-logo.png" }
];

const productosContainer = document.getElementById("productos");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let carrito = [];

// === Funciones de almacenamiento ===
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    if (data) {
        carrito = JSON.parse(data);
        renderCarrito();
    }
}

// Renderizar productos dinámicos
productos.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6 col-sm-12";

    col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text">Precio: $${p.precio.toLocaleString()}</p>
                        <button class="btn btn-info text-white w-100" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
                    </div>
                </div>
            `;
    productosContainer.appendChild(col);
});

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    renderCarrito();
    guardarCarrito();
}

// Renderizar carrito
function renderCarrito() {
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
                    ${item.nombre} - $${item.precio.toLocaleString()}
                    <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">❌</button>
                `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = carrito.length;
    cartTotal.textContent = total.toLocaleString();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderCarrito();
    guardarCarrito();
}

// Cargar carrito al iniciar
cargarCarrito();