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


@Injectable({
  providedIn: 'root'
})
export class AvailabilitiesService {

  constructor() { }

  public async list(year: string): Promise<string[]> {
    const snapshot = await get(child(dbRef, `availabilities/${year}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error('AN ERROR HAS OCCURED');
      return [];
    }
  }

  public async get(year: number, month: number): Promise<string> {
    const snapshot = await get(child(dbRef, `availabilities/${year.toString()}/${month.toString()}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error('AN ERROR HAS OCCURED');
      return '';
    }
  }
}
