// Modulos nativo de Node.js
const os = require('node:os');

console.log('Informacion del sistema operativo:');
console.log('------------------------------');
console.log(`Nombre del sistema operativo: ${os.platform()}`);
console.log(`Tipo de SO: ${os.type()}`);
console.log(`Arquitectura del CPU: ${os.arch()}`);
console.log(`Memoria libre`, os.freemem() / 1024 / 1024 + ' GB');
console.log(`Memoria total`, os.totalmem() / 1024 / 1024 + ' GB');
console.log(`CPUs: ${os.cpus().length}`);
console.log('uptime', os.uptime() / 60 + ' minutos');