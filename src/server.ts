import express, { Request, Response } from 'express'
import { Result } from './util/Result';
import { fstat, readFile } from 'fs';
import { checkServerIdentity } from 'tls';
import { bindCallback, bindNodeCallback, pipe } from 'rxjs';
import { stringify } from 'querystring';
import { resolve } from 'path'
import { okResponse, badRequestResponse, RestResponse } from './RestResponse';


const app = express()

app.get('/read/:filename', (req, res) => {
  readFileContent(req.params.filename).subscribe(

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

const filePath = (fileName: string) => resolve(__dirname, fileName)

const fileContent = (fileName: string) => boundFileContent(fileName, 'utf8')

const readFileContent = pipe(filePath, fileContent)

const handleRequest = (handler: (req: Request) => Result<any>) => (req: Request, res: Response) => {
  const result = handler(req).map(okResponse).recover(badRequestResponse)
  res.status(result.status).json(result.body)
}

const sumHandler = (req: Request) => Result.of(sum(req.params.x, req.params.y))


const sum = (x: number, y: number) => +x + +y

app.get('/sum/:x/:y', handleRequest(sumHandler))


app.listen(3000, () => console.log('Listening on port 3000!'))



const boundFileContent = bindNodeCallback((
  path: string,
  coding: string,
  callback: (error: NodeJS.ErrnoException, buffer: Buffer | string) => void
) => readFile(path, coding, callback))
