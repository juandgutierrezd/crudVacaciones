const mysql = require('mysql2')


const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"database_vacaciones"
})


db.connect((err)=>{
    if(err){
        console.error('Error al conectar a la DB: ',err);
        return;
    }
    console.log('Conexion exitosa.')
})

module.exports = db;