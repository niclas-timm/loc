const fs = require('fs');
const path = require('path');
const glob = require('glob').glob;

function loc(dirPath, options) {
    const files = getFiles(dirPath, options);

    if (files.length === 0) {
        console.error(`No files found in ${dirPath}`);
        return;
    }

    const totalLines = files.reduce((total, file) => {
        const lines = fs.readFileSync(file, 'utf8')
            .split('\n')
            .filter(line => line.trim() !== '')
            .length;
        console.log(`${file}: ${lines}`);
        return total + lines;
    }, 0);

    console.log(`Total: ${totalLines}`);
}

const getFiles = (dirPath, options) => {
    if (!fs.existsSync(dirPath)) {
        console.error(`Path ${dirPath} does not exist`);
        return;
    }

    const ignoreDirs = options.excludeDirs ? options.excludeDirs.split(',').map(dir => `${path.join(dirPath, dir)}/**`) : [];

    const ignoreExtensions = options.excludeExtensions ? options.excludeExtensions.split(',').map(ext => `**/*.${ext}`) : [];

    return glob.sync(`${dirPath}/**/*.*`, { ignore: [...ignoreDirs, ...ignoreExtensions] });
}
module.exports = loc;