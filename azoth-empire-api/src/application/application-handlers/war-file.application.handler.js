const fs = require('fs');
const path = require('path');

const { finished } = require('stream/promises');
const DirectoryName = './assets';
const { spawn } = require('child_process');

class ServerInfoApplicationHandler {
    async handle(args) {
        const { roster, stanbyList, rankings } = args;

        const rosterFiles = await this.handleFileUpload([roster], 'roster');
        const standbyFiles = await this.handleFileUpload(stanbyList, 'standby');
        const rankingFiles = await this.handleFileUpload(rankings, 'rankings');

        const imageFiles = [...rosterFiles, ...standbyFiles, ...rankingFiles];
        return this.processImageFiles(imageFiles);
    }

    async handleFileUpload(files, type) {
        const filenames = [];
        for (const file of files) {
            const filepath = path.join(__dirname, DirectoryName, type, `${Date.now()}`);
            const { createReadStream } = await file;
            const stream = createReadStream();
            const out = fs.createWriteStream(filepath);

            stream.pipe(out);
            await finished(out);
            filenames.push({
                img_path: filepath,
                type,
            });
        }

        return filenames;
    }

    async processImageFiles(files) {
        return new Promise((resolve, reject) => {
            let dataToSend = '';
            // collect data from script
            const python = spawn('python', ['./bin/main.py']);
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataToSend = data.toString();
            });

            python.on('error', err => {
                console.error(err);
                // send data to browser
                reject(err);
            });

            python.on('close', code => {
                console.log(`child process close all stdio with code ${code}`);
                // send data to browser
                resolve(dataToSend);
            });
        });
    }
}

module.exports = new ServerInfoApplicationHandler();
