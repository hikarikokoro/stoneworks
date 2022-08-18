import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  update
} from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyD4wDjbM5bbLcUyCIMTXl6f9ga5imuDGHw",
  authDomain: "nature-9789e.firebaseapp.com",
  databaseURL: "https://nature-9789e-default-rtdb.firebaseio.com",
  projectId: "nature-9789e",
  storageBucket: "nature-9789e.appspot.com",
  messagingSenderId: "335966194630",
  appId: "1:335966194630:web:304fd2c54b62a6462880c7",
  measurementId: "G-PDE52ZJTVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase(app));

interface IRegistrationInformation {
  name: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationInformationService {

  constructor() { }


  public async list(): Promise<IRegistrationInformation[]> {
    const snapshot = await get(child(dbRef, `registrationInformation`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('AN ERROR HAS OCCURED');
    }
  }

  public async get(type: number): Promise<IRegistrationInformation> {
    if (type === null || type === undefined || typeof type !== 'number') {
      throw new Error("VOTRE TYPE EST INVALIDE");
    }
    const snapshot = await get(child(dbRef, `expeditions/${type}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('AN ERROR HAS OCCURED');
    }
  }

  public generateId(): string {
    return push(child(ref(database), 'expeditions')).key as string;
  }
}
