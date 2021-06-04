const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    // Agrega curso al carrito al presionar "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    //Eliminar un cursos del carrito
    carrito.addEventListener('click', eliminarCurso)
    
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //resetear el arreglo
        limpiarHTML(); //Eliminanos todo el html
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        LeerDatos(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
     
    if(e.target.classList.contains('borrar-curso')) {
       const cursoId = e.target.getAttribute('data-id');

       //Elimina del arreglo por el data-id
       articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
       
       carritoHTML(); // Iterar sobre el carrito y mostrar su html
    }
}




// Lee contenido al que damos clic y extrae su información

function LeerDatos(curso) {
    
    //Crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisar si un elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los onsjetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos al arreglo
        articulosCarrito = [... articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra lo que contiene el array en HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" >
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>

        `;

        //Agrega el HTML en el tbody de carrito
        contenedorCarrito.appendChild(row);
    });
}

//Elimina o Limpiar los cursos previos del tbody
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    //Forma rápida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}