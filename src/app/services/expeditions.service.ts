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

enum IExpeditionTypes {
  coldWeather,
  outdoors
}

interface IExpedition {
  title: string,
  subtitle: string,
  description: string,
  extra: any,
  cards: IExpeditionCard[]
}

interface IExpeditionCard {
  cost: number,
  name: string,
  type: string,
  time: number,
  description: string
}
@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {

  constructor() { }


  public async list(type: IExpeditionTypes): Promise<IExpedition> {
    console.log(type);
    const snapshot = await get(child(dbRef, `expeditions/${type}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('AN ERROR HAS OCCURED');
    }
  }

  public async get(type: IExpeditionTypes, expeditionNumber: number): Promise<IExpeditionCard> {
    if (expeditionNumber === null || expeditionNumber === undefined) {
      throw new Error("VOTRE EXPEDITION ID EST INVALIDE");
    }
    const snapshot = await get(child(dbRef, `expeditions/${IExpeditionTypes[type]}/cards/` + expeditionNumber));
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
