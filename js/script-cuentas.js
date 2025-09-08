document.addEventListener("DOMContentLoaded", () => {
    const agregarProductoBtn = document.getElementById("agregarProducto");
    const calcularTotalBtn = document.getElementById("calcularTotal");
    const productosContainer = document.getElementById("productosContainer");
    const resultadoTotal = document.getElementById("resultadoTotal");
    const resultadoSobrante = document.getElementById("resultadoSobrante");
    const presupuestoInput = document.getElementById("presupuesto");

    // Función para agregar un producto
    function agregarProducto() {
        const div = document.createElement("div");
        div.classList.add("row", "mb-3", "producto-item");

        div.innerHTML = `
            <div class="col-6">
                <input type="text" class="form-control" placeholder="Descripción" required>
            </div>
            <div class="col-4">
                <input type="number" class="form-control precio" placeholder="Monto" required>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-danger w-100 btn-eliminar">X</button>
            </div>
        `;

        productosContainer.appendChild(div);

        // Asignar evento al botón eliminar recién creado
        const btnEliminar = div.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            div.remove();
        });
    }

    // Evento para agregar producto
    agregarProductoBtn.addEventListener("click", agregarProducto);

    // Asignar evento a los botones eliminar existentes (la fila inicial)
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", e => {
            e.target.closest(".producto-item").remove();
        });
    });

    // Calcular total y sobrante
    calcularTotalBtn.addEventListener("click", () => {
        const montos = document.querySelectorAll(".precio");
        let total = 0;
        montos.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) total += value;
        });

        resultadoTotal.textContent = `Total de productos: $${total.toFixed(2)}`;

        const presupuesto = parseFloat(presupuestoInput.value);
        if (!isNaN(presupuesto)) {
            const sobrante = presupuesto - total;
            resultadoSobrante.textContent = `Sobrante del presupuesto: $${sobrante.toFixed(2)}`;
        } else {
            resultadoSobrante.textContent = '';
        }
    });
});
