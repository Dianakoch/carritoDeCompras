const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarriro = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//eventos
cargarEventListeners();
function cargarEventListeners(){
    // cuando agregas un curso presionando "Agregar al carrito en el btn html"
    listaCursos.addEventListener('click', agregarCurso);
}


//funciones
function agregarCurso(e){
    e.preventDefault(); //quita la sintaxis del simbolo de gto # en el html
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//lee el contendido del html y extraer el contenido dl curso
function leerDatosCurso(curso){
    // console.log(curso);

    //crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, //extraemols la imagen con el src
        titulo: curso.querySelector('h4').textContent, //extraemos el titulo
        precio: curso.querySelector('.precio span') .textContent,
        id: curso.querySelector('a').getAttribute('data-id'), //tomamos le id del elemento
        cantidad: 1
    }

    //revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos 
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso; //retorna lo objetos que no estan siendo dublicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito);

    carritoHTML(); //estamos mandando a llamar a la funcion luego de leer todos los datos el carrito
}


//muestra el carrito de comprras en el html

function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso =>{
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //agrega html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //
}

//elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = ''; //se limpia el html y despues de vuelve a iterar

    //forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}