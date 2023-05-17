const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'none'; font-src 'self' http://localhost:3000");
  next();
});


app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'usuario' && password === 'password') {
    const token = jwt.sign({ username }, 'clave_secreta', { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

app.get('/protegido', verificarToken, (req, res) => {
  res.json({ mensaje: 'Acceso permitido' });
});

function verificarToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'clave_secreta', (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Token inválido' });
      } else {
        req.usuario = decoded;
        next();
      }
    });
  } else {    
    res.status(401).json({ error: 'Token requerido' });
  }
}
app.listen(3000, () => {
  console.log('Servidor en funcionamiento en http://localhost:3000');
});
