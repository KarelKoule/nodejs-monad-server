"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const rxjs_1 = require("rxjs");
const path_1 = require("path");
const app = express_1.default();
app.get('/', (req, res) => {
    boundFileContent(path_1.resolve(__dirname, 'testcontent.txt'), 'utf8').subscribe(buffer => {
        console.log('succcceesss');
        res.send(buffer);
    }, error => {
        console.log("kokos");
        res.status(400).send(error);
    });
});
app.get('/unknown.file', (req, res) => {
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
const boundFileContent = rxjs_1.bindNodeCallback((path, coding, callback) => fs_1.readFile(path, coding, callback));
//# sourceMappingURL=server.js.map