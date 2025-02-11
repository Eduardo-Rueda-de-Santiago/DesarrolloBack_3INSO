import {open, exists} from 'fs';
import path = require('path');


function readJsonFile(file: string) {
    open(file, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('myfile does not exist');
                return;
            }
            throw err;
        }
        try {
            readMyData(fd);
        } finally {
            close(fd, (err) => {
                if (err) throw err;
            });
        }
    })
}

const FILE_NAME = path.join(path.dirname("curso.json"));

exists(FILE_NAME, (exists: boolean) => {
    console.log(exists);
})

// const data: string = fs.readFileSync(FILE_NAME, {encoding: 'utf8', flag: "r"});
//
// console.log(data);