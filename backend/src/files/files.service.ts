import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const sizeOf = require('image-size');

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file, dirName: string = 'default'): Promise<string> {
    try {
      console.log(dirName);
      const filename = uuid.v4() + path.extname(file.originalname);
      const folderName = dirName.toString()
        ? `${dirName.toString()}`
        : 'static';
      const filePath = path.resolve(__dirname, '..', `static/${folderName}`);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, filename), file.buffer);
      const dimensions = sizeOf(`dist/src/static/${folderName}/${filename}`);
      let returnFile = `{
          "name": "${filename}",
          "folder": "${folderName}",
          "dimensionsWidth": "${dimensions.width}",
          "dimensionsHeight": "${dimensions.height}"
      }`;

      return returnFile;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'error save file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
