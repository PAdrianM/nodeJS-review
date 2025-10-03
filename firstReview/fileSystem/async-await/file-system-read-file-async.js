//Asincrono con callbacks
const { error } = require('node:console');
const fs = require('node:fs'); // a partir de Node.js v16 se recomienda usar el prefijo 'node:'

console.log('Leyendo archivo 1...');
fs.readFile('./archivo.txt', 'utf-8', (error, text) => {
    console.log('primer texto: ', text);
}); // lee el contenido del archivo de forma asincrona

console.log('------> Hacer cosas mientras lee el archivo...');

console.log('Leyendo archivo 2...');
fs.readFile('./archivo2.txt', 'utf-8', (error, text) => {
    console.log('segundo texto: ', text);
}); // lee el contenido del archivo de forma asincrona