const express = require('express')

const routerSolicitudes  =  express.Router()
routerSolicitudes.use(express.json())
const SolicitudesControllers = require("../controllers/solicitudesControllers")


//SOLICITUDES DE VACACIONES
routerSolicitudes.get('/',SolicitudesControllers.obtenerSolicitudes);
  
//solicitudes por id 
  routerSolicitudes.get('/:id',SolicitudesControllers.obtenerSolicitudId);
  
//crear solicitud  
  routerSolicitudes.post('/', SolicitudesControllers.crearSolicitud);

//Actualizar Solicitud 
  routerSolicitudes.put('/:id', SolicitudesControllers.actualizarSolicitud);

//Eliminar Solicitud
  routerSolicitudes.delete('/:id',SolicitudesControllers.eliminarSolicitud);

  module.exports = routerSolicitudes