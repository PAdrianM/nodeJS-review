// Modulos nativo de Node.js
import { platform, type, arch, freemem, totalmem, cpus, uptime } from 'node:os';

console.log('Informacion del sistema operativo:');
console.log('------------------------------');
console.log(`Nombre del sistema operativo: ${platform()}`);
console.log(`Tipo de SO: ${type()}`);
console.log(`Arquitectura del CPU: ${arch()}`);
console.log(`Memoria libre`, freemem() / 1024 / 1024 + ' GB');
console.log(`Memoria total`, totalmem() / 1024 / 1024 + ' GB');
console.log(`CPUs: ${cpus().length}`);
console.log('uptime', uptime() / 60 + ' minutos');