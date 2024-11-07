import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { sep, join, relative, extname } from 'path';

const excludeDirs = new Set([
    'node_modules',
    '.git',
    '.next',
    'dist',
    'build',
    'out',
    'coverage',
    '.vercel',
    '.github',
    '.vscode'
]);

const excludeFiles = new Set([
    '.env',
    '.env.local',
    '.DS_Store',
    'Thumbs.db',
    'package-lock.json',
    'yarn.lock',
    '.gitignore',
    '.npmrc',
    'codebase_bundle.txt'
]);

const binaryExtensions = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.ico',
    '.webp',
    '.pdf',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.mp4',
    '.webm',
    '.mov',
    '.mp3',
    '.wav',
    '.zip',
    '.tar',
    '.gz'
]);

const shouldExclude = (fullPath) => {
    const parts = fullPath.split(sep).filter(Boolean);
    return parts.some(part => excludeDirs.has(part)) || excludeFiles.has(parts[parts.length - 1]);
};

const isBinaryFile = (filename) => {
    return binaryExtensions.has(extname(filename).toLowerCase());
};

const bundleCodebase = (rootDir = '.') => {
    const output = ['<documents>'];
    let fileIndex = 1;

    const processDirectory = (currentPath) => {
        const files = readdirSync(currentPath, { withFileTypes: true });
        
        for (const file of files) {
            const fullPath = join(currentPath, file.name);
            
            if (shouldExclude(fullPath)) {
                continue;
            }

            if (file.isDirectory()) {
                processDirectory(fullPath);
            } else {
                try {
                    const relativePath = relative(rootDir, fullPath);
                    
                    if (isBinaryFile(file.name)) {
                        // For binary files, just note their existence without content
                        output.push(
                            `\n<document index="${fileIndex}">`,
                            `<source>${relativePath}</source>`,
                            '<document_content>',
                            '[Binary file]',
                            '</document_content>',
                            '</document>'
                        );
                    } else {
                        // For text files, include the full content
                        const content = readFileSync(fullPath, 'utf8');
                        output.push(
                            `\n<document index="${fileIndex}">`,
                            `<source>${relativePath}</source>`,
                            '<document_content>',
                            content,
                            '</document_content>',
                            '</document>'
                        );
                    }
                    
                    fileIndex++;
                } catch (err) {
                    console.warn(`Warning: Error processing ${fullPath}: ${err.message}`);
                }
            }
        }
    };

    try {
        processDirectory(rootDir);
        output.push('</documents>');
        return output.join('\n');
    } catch (err) {
        console.error('Error bundling codebase:', err);
        return null;
    }
};

const directory = process.argv[2] || '.';
const result = bundleCodebase(directory);

if (result) {
    const outputFile = 'codebase_bundle.txt';
    writeFileSync(outputFile, result, 'utf8');
    console.log(`\nCodebase successfully bundled to ${outputFile}`);
    console.log(`Total size: ${result.length.toLocaleString()} characters`);
} else {
    console.error('Failed to bundle codebase');
}