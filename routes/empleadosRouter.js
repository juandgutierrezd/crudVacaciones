const express = require('express')

const routerEmpleados  =  express.Router()
routerEmpleados.use(express.json())

const EmpleadosControllers = require("../controllers/empleadosControllers.js")

//Obtener Empleados
routerEmpleados.get('/',EmpleadosControllers.obtenerEmpleados)
//Un solo empleado
routerEmpleados.get('/:id',EmpleadosControllers.obtenerEmpleadoId)

//CREAR UN EMPLEADO
routerEmpleados.post('/',EmpleadosControllers.crearEmpleado)

//ACTUALIZAR EMPLEADO
routerEmpleados.put('/:id', EmpleadosControllers.actualizarEmpleado) 

//Eliminar Empleado
routerEmpleados.delete('/:id',EmpleadosControllers.eliminarEmpleado);

module.exports = routerEmpleados