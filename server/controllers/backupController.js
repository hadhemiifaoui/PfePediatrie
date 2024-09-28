const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const listBackups = (req, res) => {
    const backupDir = path.join(__dirname, '../backup');

    fs.readdir(backupDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to list backups' });
        }
        const backups = files.filter(file => {
            const filePath = path.join(backupDir, file);
            return fs.lstatSync(filePath).isFile() || fs.lstatSync(filePath).isDirectory();
        });

        res.json({ backups });
    });
};


const createBackup = (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); 
    const backupFolder = `backup-${timestamp}`;
    const backupPath = path.join(__dirname, '../backup', backupFolder);

    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
    }

    const command = `mongodump --uri="mongodb://127.0.0.1:27017/pediatrie_data_base" --out=${backupPath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating backup: ${error.message}`);
            return res.status(500).json({ error: 'Backup failed', details: stderr });
        }
        res.json({ message: 'Backup created successfully', output: stdout });
    });
};



const restoreBackup = (req, res) => {
    const backupPath = path.join(__dirname, '../backup');
    const command = `mongorestore --uri="mongodb://127.0.0.1:27017/pediatrie_data_base" ${backupPath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error restoring backup: ${error.message}`);
            return res.status(500).json({ error: 'Restore failed' });
        }
        res.json({ message: 'Restore completed successfully', output: stdout });
    });
};



const downloadBackup = (req, res) => {
    const backupDir = path.join(__dirname, '../backup');
    const backupFolderName = req.params.filename; 
    const folderPath = path.join(backupDir, backupFolderName); 
    if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
        const zipFileName = `${backupFolderName}.zip`; 
        const zipFilePath = path.join(backupDir, zipFileName); 

        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', (err) => {
            console.error(`Error creating zip file: ${err.message}`);
            res.status(500).json({ error: 'Error creating zip file' });
        });

        output.on('close', () => {
            res.download(zipFilePath, (err) => {
                if (err) {
                    console.error(`Error downloading zip file: ${err.message}`);
                    res.status(500).json({ error: 'Error downloading zip file' });
                }
                fs.unlink(zipFilePath, (err) => {
                    if (err) {
                        console.error(`Error deleting zip file: ${err.message}`);
                    }
                });
            });
        });

        archive.pipe(output);
        archive.directory(folderPath, false);
        archive.finalize();
    } else {
        res.status(404).json({ error: 'Backup not found or not a directory' });
    }
};

const deleteBackup = (req, res) => {
    const backupDir = path.join(__dirname, '../backup');
    const backupFileName = req.params.filename;
    const backupFilePath = path.join(backupDir, backupFileName);

    if (fs.existsSync(backupFilePath)) {
        fs.rmSync(backupFilePath, { recursive: true, force: true });
        res.json({ message: 'Backup deleted successfully' });
    } else {
        res.status(404).json({ error: 'Backup not found' });
    }
};


 module.exports= {listBackups ,createBackup , restoreBackup  , downloadBackup , deleteBackup }


