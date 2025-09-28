const fs = require('node:fs'); // a partir de Node.js v16 se recomienda usar el prefijo 'node:'

console.log('Leyendo archivo 1...');
const contenido = fs.readFileSync('./archivo.txt', 'utf-8'); // lee el contenido del archivo de forma sincrona

console.log(contenido);

console.log('Hacer cosas mientras lee el archivo...');

console.log('Leyendo archivo 2...');
const contenido2 = fs.readFileSync('./archivo2.txt', 'utf-8'); // lee el contenido del archivo de forma sincrona

console.log(contenido2);