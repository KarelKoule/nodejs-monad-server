import express, { Request, Response } from 'express'
import { Result } from './Result';
import { fstat, readFile } from 'fs';
import { checkServerIdentity } from 'tls';
import { bindCallback, bindNodeCallback } from 'rxjs';
import { stringify } from 'querystring';
import { resolve } from 'path'


const app = express()

app.get('/', (req, res) => {
    boundFileContent(resolve(__dirname, 'testcontent.txt'), 'utf8').subscribe(

        buffer => {
            console.log('succcceesss');

            res.send(buffer)
        },

        error => {
            console.log("kokos");

            res.status(400).send(error)
        }

    )


})


app.get('/unknown.file', (req, res) => {





})


app.listen(3000, () => console.log('Example app listening on port 3000!'))



const boundFileContent = bindNodeCallback((
    path: string,
    coding: string,
    callback: (error: NodeJS.ErrnoException, buffer: Buffer | string) => void
) => readFile(path, coding, callback))




