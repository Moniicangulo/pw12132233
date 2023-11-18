const e = require("express");
var express = require("express");
var mysql = require("mysql");


//habilitar recepcion de JSON
var app = express(); //ejecutamos el constructor y creamos el objeto
app.use(express.json());

//configuramos la conexion
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw1213"
});

//probar la conexion
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conectado exitosamente a la base de datos:)");
    }
});

app.get("/", function(req, res){
    res.send("<h1> Ruta de inicio <h1>")
});

//verbos de solicitud de cliente
/* app.get();
app.post();
app.put();
app.delete(); */

//mostrar todos el catalogo de maestros
app.get("/api/maestros", (req,res)=>{
    conexion.query("SELECT * FROM maestros", (error, filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

//el LIMIT 1, te devuelve solo 1, no recorre toda la tabla, porque sigue con la busqueda aunque este campo se la llave primaria
//mostrar un solo maestro
app.get("/api/maestros/:id", (req, res)=>{
    conexion.query("SELECT * FROM maestros WHERE clave = ? LIMIT 1", [req.params.id], (error, fila) =>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    });
});
// Agregar un maestro
app.post('/api/maestros',(req,res)=>{
    let data = {clave:req.body.cla,
                nombre:req.body.nom,
                departamento:req.body.dep,
                estatus:req.body.est}
    let sql = "INSERT INTO maestros SET ?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//Actualizar datos de maestro
app.put("/api/maestros/:id",(req, res)=>{
    let clave = req.params.id;
    let nombre = req.body.nom;
    let departamento = req.body.dep;
    let estatus = req.body.est;
    let sql = "UPDATE maestros SET nombre = ?, departamento = ?, estatus = ? WHERE clave = ?";
    conexion.query(sql, [nombre, departamento, estatus, clave], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//Eliminar un registro maestro
app.delete("/api/maestros/:id",(req,res)=>{
    conexion.query("DELETE FROM maestros WHERE clave = ?", [req.params.id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

// encender el servidor
app.listen("3000", function(){
    console.log("Servidor puerto 3000");
});
