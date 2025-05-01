const express = require('express')
const cors =require('cors')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const solicitudRouter = require('./routes/solicitudesRouter.js')
const routerEmpleados = require('./routes/empleadosRouter.js')

const db = require("./db/conexion.js");

const PORT = process.env.PORT || 3001;

const app = express()

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
//Milddleware
app.use(express.json())

//Coonfugiramos conexion

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(403).json({ error: 'Token requerido' });

  jwt.verify(token,  'JJJJJJJJJJJJ', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) return res.status(403).json({ error: 'Acceso solo para administradores' });
  next();
};
//-----------------------------


app.post('/login', (req, res) => {
  const { email, contrasena } = req.body;

  const sql = 'SELECT * FROM empleados WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = results[0];

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, role_id: user.role_id }, 'JJJJJJJJJJJJ', { expiresIn: '1h' });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      role: user.role_id,
      nombre: user.nombre_completo,
      id:user.id 
    });
  });
});


//----------RUTAS DE CRUD

//Empleados completos
app.use('/empleados',routerEmpleados);
//---------------

// Obtener todos los roles
app.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

//Obtener todos los motivos
  app.get('/motivos', (req, res) => {
    const sql = 'SELECT * FROM motivo_vacaciones';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

//Estado de vacaciones
app.get('/estados', (req, res) => {
    const sql = 'SELECT * FROM estado_vacaciones';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

app.use('/solicitudes',solicitudRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
