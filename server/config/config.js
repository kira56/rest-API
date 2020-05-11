// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;


// ===============================
// Enviroment - Entorno
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ===============================
// Base de Datos
// ===============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafeDB';
} else {
    urlDB = 'mongodb+srv://kira56:Tomcat1508@cluster0-vtpre.mongodb.net/cafeDB'
}
process.env.URLDB = urlDB;




