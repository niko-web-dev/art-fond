import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

  async createFile(file, dirName: string = ''): Promise<string>{
    try{

        const filename = uuid.v4() + path.extname(file.originalname);
      console.log(dirName)
        const filePath = path.resolve(__dirname, '..', dirName ? `static/${dirName}` : 'static')
        if (!fs.existsSync(filePath)){
          fs.mkdirSync(filePath, {recursive: true})
        }
        fs.writeFileSync(path.join(filePath, filename), file.buffer)
      let returnFile = `{
          name: ${filename},
          path: ${filePath},
      }`;
        console.log(returnFile)

      return returnFile
    } catch (e) {
      console.log(e)
      throw new HttpException('error save file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
