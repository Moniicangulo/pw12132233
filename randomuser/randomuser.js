var numero = 0;
var caracter = 0;
var datos = [];

async function apirandomuser(){
    numero = 0;
    caracter = document.getElementById("cantidad").value;
    const respuesta = await fetch("https://randomuser.me/api?results=" + caracter);
    datos = await respuesta.json();
    muestra();
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

function muestra(){
    console.log("Arreglo posicion: " + numero);
    let foto = document.getElementById("foto");
    let nombre = document.getElementById("nombre");
    let telefono = document.getElementById("telefono");
    foto.setAttribute("src", datos.results[numero].picture.large);
    foto.style.borderRadius = "50%";
    nombre.innerHTML = datos.results[numero].name.first + " " + datos.results[numero].name.last; 
    nombre.style.color = "red";
    telefono.innerHTML = datos.results[numero].phone;
}