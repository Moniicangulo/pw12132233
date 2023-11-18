var numero = 0;
var caracter = 0;
var datos = [];

const inputBusqueda = document.querySelector("#caracter");
const listaBusqueda = document.querySelector("#lista");

async function apicaracters(){
    busqueda();
    listaBusqueda.style.display = "none";
    muestra();
}

async function busqueda(){
    numero = 0;
    caracter = document.getElementById("caracter").value;
    const respuesta = await fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=" 
                        + caracter);
    datos = await respuesta.json();
}

function anterior(){
    numero--;
    if(numero < 0){
        numero = caracter - 1;
    }
    muestra();
}

function siguiente(){
    numero++;
    if(numero == caracter){
        numero = 0;
    }
    muestra();
}

inputBusqueda.addEventListener("keyup", async()=>{
    await busqueda();
    listaBusqueda.innerHTML ="";
    let nuevoElemento, elemento = "";
    
    let max = datos.data.count >= 5 ? 5 : datos.data.count;
    for (let index = 0; index < max ; index++) {
        nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = datos.data.results[index].name;
        listaBusqueda.appendChild(nuevoElemento);
    }
});

listaBusqueda.addEventListener("click", function(event){
    if(event.target.tagName === "LI"){
        inputBusqueda.value = event.target.textContent;
        listaBusqueda.style.display = "none";
    }

});


function muestra(){
    console.log("Arreglo posicion: " + numero);
    let foto = document.getElementById("foto");
    let nombre = document.getElementById("nombre");
    let descripcion = document.getElementById("descripcion");
    let comics = document.getElementById("comics");
    foto.setAttribute("src", datos.data.results[numero].thumbnail.path+ "." +datos.data.results[numero].thumbnail.extension);
    nombre.innerHTML = datos.data.results[numero].name;
    comics.innerHTML = "Comics disponibles: " + datos.data.results[numero].comics.available;
    descripcion.innerHTML = datos.data.results[numero].description;
}