import { deleteProduct } from "./deletProducts.js";

function printProducts() {
    let products = document.getElementById('products');

    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                // Crear un nuevo elemento de imagen (SVG) para el botón borrar
                let svg = document.createElement('img');
                svg.src = '../img/btn-borrar.svg';
                svg.alt = 'Eliminar producto';
                svg.classList.add('btn-delete'); // Añadimos una clase para estilos específicos
                
                // Crear el HTML del producto
                let productHTML = `
                    <div class="cart" id="${element.id}">
                        <img src="${element.img}" alt="Imagen del producto">
                        <p>${element.name}</p>
                        <div class="price">
                            <p>$ ${element.price}</p>
                        </div>
                    </div>
                `;
                
                // Crear un contenedor div para el producto
                let div = document.createElement('div');
                div.innerHTML = productHTML;

                // Agregar el botón SVG al contenedor `.price`
                div.querySelector('.price').appendChild(svg);

                // Agregar el producto al contenedor principal
                products.appendChild(div);

                // Agregar evento al botón para eliminar el producto
                svg.addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteProduct(element.id); // Llama a la función para eliminar el producto
                });
            });
        })
        .catch(error => console.error("Error:", error));
}

printProducts();

export { printProducts };
