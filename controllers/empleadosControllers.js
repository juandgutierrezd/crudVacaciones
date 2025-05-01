const db = require("../db/conexion.js")
const bcrypt = require('bcrypt');

class EmpleadosControllers{
    constructor(){

    }

    obtenerEmpleados=(req,res)=>{
        const sql = 'SELECT * FROM empleados';
        db.query(sql, (err,result)=>{
            if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.json(result);
        })
    }

    obtenerEmpleadoId=(req,res)=>{
            const {id}= req.params
            const sql = `SELECT * FROM empleados WHERE id=?`;
    
            db.query(sql, [id], (err, results) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }
                if (results.length === 0) {
                  return res.status(404).json({ message: 'Empleado no encontrado' });
                }
                res.json(results[0]);
              });
    }

    crearEmpleado = async (req,res)=>{
        const {role_id, nombre_completo, email, contrasena} = req.body;
        console.log(req.body)
    
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const sql = `INSERT INTO empleados (role_id,nombre_completo,email,contrasena) VALUES (?,?,?,?)`;
    
        db.query(sql,[role_id, nombre_completo, email, hashedPassword],(err,result)=>{
            if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.status(201).json({ message: 'Empleado creado', id: result.insertId });
        })
    }

    actualizarEmpleado=(req, res)=>{
      const {id} = req.params;
      const {role_id,nombre_completo, email} = req.body;
      const sql = `UPDATE empleados SET role_id = ?,nombre_completo = ? , email = ?  WHERE id= ?`;
  
      db.query(sql,[role_id,nombre_completo,email,id], (err, result) =>{
          if (err) {
              return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.json({ message: 'Empleado actualizado' });
      })
  }

    eliminarEmpleado= (req, res) => {
        const { id } = req.params;
        const sql = 'DELETE FROM empleados WHERE id = ?';
        db.query(sql, [id], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
          }
          res.json({ message: 'Empleado eliminado' });
        });
      }
    
}

module.exports=new EmpleadosControllers();