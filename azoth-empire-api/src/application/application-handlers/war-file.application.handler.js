const fs = require('fs');
const path = require('path');

const { finished } = require('stream/promises');
const DirectoryName = '../../../assets';
const { spawn } = require('child_process');
const { rmSync } = require('fs');
const MONGO_URI = fs.readFileSync('secrets/.mongo-uri', 'utf8').toString().trim();

class ServerInfoApplicationHandler {
    async handle(args) {
        let res;
        let imageFiles = [];
        try {
            const { roster, stanbyList, rankings } = args;

            const rosterFiles = await this.handleFileUpload([roster], 'ROSTER');
            const standbyFiles = await this.handleFileUpload(stanbyList, 'STANDBY');
            const rankingFiles = await this.handleFileUpload(rankings, 'RANKINGS');

            imageFiles = [...rosterFiles, ...standbyFiles, ...rankingFiles];

            res = await this.processImageFiles(imageFiles);
            await this.removeImageFiles(imageFiles);
        } catch (e) {
            console.error(e);
            await this.removeImageFiles(imageFiles);
            throw new Error('Unable to parse images. Please take a new screenshot and try again.');
        }

        return res;
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

    async removeImageFiles(files) {
        return Promise.all(
            files.map(async file => {
                return fs.rmSync(file.img_path);
            }),
        );
    }

    async processImageFiles(files) {
        return new Promise((resolve, reject) => {
            let dataToSend = '';
            // collect data from script
            const scriptPath = path.join(__dirname, '../../../bin/ae-roster-parser/main.py');
            const python = spawn('python3', [scriptPath, files, `${MONGO_URI}`]);
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataToSend = data.toString();
            });

            python.stderr.on('data', data => {
                // send data to browser
                reject(data.toString());
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
