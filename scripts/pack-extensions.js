const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// List of directories containing extensions
const extensions = [
    'Aurora Watcher by Aleksi',
    'Emoji Picker by Aleksi',
    'Quick Currency Converter by Aleksi',
    'Text-to-Speech Reader by Aleksi',
    'Auto Fill by Aleksi',
    'Auto Refresh by Aleksi'
];

const outputDir = path.join(__dirname, '..', 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

console.log('📦 Starting to pack extensions for the Chrome Web Store...\n');

extensions.forEach(ext => {
    const extPath = path.join(__dirname, '..', ext);
    const outputPath = path.join(outputDir, `${ext.replace(/ /g, '_')}.zip`);

    // Only zip if the extension directory actually exists
    if (!fs.existsSync(extPath)) {
        console.warn(`⚠️ Warning: Extension directory "${ext}" not found. Skipping.`);
        return;
    }

    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function() {
        console.log(`✅ ${ext} -> ${archive.pointer()} total bytes -> saved to dist/`);
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    // Append files from the extension directory
    // We do NOT want to zip the parent folder itself, just the contents inside
    archive.directory(extPath, false);

    archive.finalize();
});
