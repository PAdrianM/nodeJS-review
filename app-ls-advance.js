const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.';

async function listFiles(folder) {
    let files;
    try {
        files = await fs.readdir(folder);
    } catch (err) {
        console.error('Error reading directory:', err);
        process.exit(1);
    }

    const filePromises = files.map(async (file) => {
        const filePath = path.join(folder, file);
        let stats;

        try {
            stats = await fs.stat(filePath); // status - Obtener información del archivo
        } catch (err) {
            console.error(`Error getting stats for file ${file}:`, err);
            process.exit(1);
        }
       
        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? '📁' : '📄';
        const fileSize = stats.size;
        const fileModified = stats.mtime.toLocaleString();

        return `${fileType} ${file.padEnd(20)} - ${fileSize.toString().padStart(10)} bytes ${fileModified}`;
    });

    const filesInfo = await Promise.all(filePromises);
    filesInfo.forEach(info => console.log(info));
}

listFiles(folder);

