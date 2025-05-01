const db = require("../db/conexion.js")
const bcrypt = require('bcrypt');

class SolicitudesControllers{
    constructor(){

    }

    obtenerSolicitudes = (req, res) => {
        const sql = 'SELECT * FROM solicitud_vacaciones';
        db.query(sql, (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(results);
        });
      }

    obtenerSolicitudId= (req, res) => {
        const { id } = req.params;
        const sql = 'SELECT * FROM solicitud_vacaciones WHERE id = ?';
        db.query(sql, [id], (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          if (results.length === 0) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
          }
          res.json(results[0]);
        });
      }

    crearSolicitud =(req, res) => {
        const { empleado_id, fecha_inicio, fecha_fin, dias_solicitados, motivo_id} = req.body;
        const sql = `
          INSERT INTO solicitud_vacaciones (empleado_id, fecha_inicio, fecha_fin, dias_solicitados, motivo_id)
          VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, [empleado_id, fecha_inicio, fecha_fin, dias_solicitados, motivo_id], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'Solicitud creada', id: result.insertId }); 
        });
      }

    actualizarSolicitud=(req, res) => {
        const { id } = req.params;
        const { empleado_id, fecha_inicio, fecha_fin, dias_solicitados, motivo_id,estado_id } = req.body;
        console.log(req.body)
      
        const sql = `
          UPDATE solicitud_vacaciones 
          SET empleado_id = ?, fecha_inicio = ?, fecha_fin = ?, dias_solicitados = ?, motivo_id = ?, estado_id=?
          WHERE id = ?
        `;
      
        db.query(sql, [empleado_id, fecha_inicio, fecha_fin, dias_solicitados, motivo_id,estado_id, id], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
          }
          res.json({ message: 'Solicitud actualizada correctamente' });
        });
      }

    eliminarSolicitud =  (req, res) => {
        const { id } = req.params;
        const sql = 'DELETE FROM solicitud_vacaciones WHERE id = ?';
        db.query(sql, [id], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
          }
          res.json({ message: 'Solicitud eliminada' });
        });
      }
    
}

module.exports = new SolicitudesControllers();