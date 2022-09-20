import { Injectable } from '@angular/core';
var spawn = require('child_process').spawn;

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  public static exec(command: string, cwd: string | undefined) {
    return new Promise((resolve, reject) => {
      spawn.exec(command, { cwd }, (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`exec error: ${error} ${command} ${cwd}`);
          return reject(error);
        }
        return resolve({ stdout, stderr });
      }).stdout.on('data', (data: any) => {
        console.log(data);
      });
    });
  }
}
