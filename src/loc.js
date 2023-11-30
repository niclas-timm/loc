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

    const ignoreDirs = options.excludeDirs
        ? options.excludeDirs.split(',').map(dir => `${path.join(dirPath, dir)}/**`)
        : [];

    if (options.useDefaultIgnoreDirs) {
        ignoreDirs.push(...defaultIgnoreDirs(dirPath));
    }

    const ignoreExtensions = options.excludeExtensions
        ? options.excludeExtensions.split(',').map(ext => `**/*.${ext}`)
        : [];

    if (options.useDefaultIgnoreExt) {
        ignoreExtensions.push(...defaultIgnoreExts());
    }

    return glob.sync(`${dirPath}/**/*.*`, { ignore: [...ignoreDirs, ...ignoreExtensions] });
}

function defaultIgnoreExts() {
    const exts = [
        'woff',
        'woff2',
        'eot',
        'ttf',
        'otf',
        'png',
        'jpg',
        'jpeg',
        'gif',
        'svg',
        'ico',
        'mp4',
        'mp3',
        'wav',
        'ogg',
        'avi',
        'mov',
        'webm',
        'mkv',
        'zip',
        'tar',
        'gz',
        '7z',
        'rar',
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'csv'
    ];

    return exts.map(ext => `**/*.${ext}`);
}

function defaultIgnoreDirs(dirPath) {
    const dirs = [
        'vendor',
        'node_modules',
        'bower_components',
        'public',
        'dist',
        'build',
        'tmp',
        'temp',
        'out',
        'output',
        'logs',
        'flow-typed',
        'coverage',
        'android',
        'ios',
        'img',
        'images',
        'assets',
        'fonts',
        'videos',
        'audio',
        'docs',
        'lang',
        'locales',
        'translations',
        'data'
    ];

    return dirs.map(dir => `${path.join(dirPath, dir)}/**`);
}

module.exports = loc;
