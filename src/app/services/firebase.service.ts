
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
	Database,
	DatabaseReference,
	getDatabase,
	ref
} from 'firebase/database';
import { environment } from 'src/environments/environment';

const firebaseConfig = {
	apiKey: environment.firebaseConfigs.apiKey,
	authDomain: environment.firebaseConfigs.authDomain,
	databaseURL: environment.firebaseConfigs.databaseURL,
	projectId: environment.firebaseConfigs.projectId,
	storageBucket: environment.firebaseConfigs.storageBucket,
	messagingSenderId: environment.firebaseConfigs.messagingSenderId,
	appId: environment.firebaseConfigs.appId,
	measurementId: environment.firebaseConfigs.measurementId
};

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {
	private _dbRef!: DatabaseReference;

	constructor() {
		this.initializeFirebase();
	}

	public getdbRef(): DatabaseReference {
		return this._dbRef;
	}

	private initializeFirebase(): void {
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const database = getDatabase(app);
		this._dbRef = ref(database);
	}

}