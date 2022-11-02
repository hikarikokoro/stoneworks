import * as dotenv from 'dotenv';
import * as fs from 'fs';
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';
// Load node modules
dotenv.config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   server_URL: '${process.env['SERVER_URL']}',
   firebaseConfigs: {
	 apiKey: '${process.env["apiKey"]}',
	 authDomain: '${process.env["authDomain"]}',
	 databaseURL: '${process.env["databaseURL"]}',
	 projectId: '${process.env["projectId"]}',
	 storageBucket: '${process.env["storageBucket"]}',
	 messagingSenderId: '${process.env["messagingSenderId"]}',
	 appId: '${process.env["appId"]}',
	 measurementId: '${process.env["measurementId"]}'
   }
};
`;
console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);
fs.writeFile(targetPath, envConfigFile, function (err) {
	if (err) {
		throw console.error(err);
	} else {
		console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
	}
});
fs.writeFile(targetPathProd, envConfigFile, function (err) {
	if (err) {
		throw console.error(err);
	} else {
		console.log(`Angular environment.ts file generated correctly at ${targetPathProd} \n`);
	}
});