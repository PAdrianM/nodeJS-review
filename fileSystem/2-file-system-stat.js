// File system el module mas importanto de Node.js
const fs = require('node:fs'); // a partir de Node.js v16 se recomienda usar el prefijo 'node:'

const stats = fs.statSync('./archivo.txt'); // devuelve un objeto con informacion del archivo

console.log(
    stats.isFile(), // true si es un archivo
    stats.isDirectory(), // true si es un directorio
    stats.size, // tamaño en bytes
    stats.mtime, // fecha de la ultima modificacion
    stats.birthtime, // fecha de creacion
    stats.isSymbolicLink(), // si es un sistem simbolico
)