// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;


// ===============================
// Enviroment - Entorno
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// Vencimiento token
// ===============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-production';

// ===============================
// SEEd de authentication
// ===============================
// 60 segundas - 60 minutos
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

// ===============================
// Base de Datos
// ===============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafeDB';
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.URLDB = urlDB;




