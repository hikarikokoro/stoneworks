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
  northern,
  outdoors
}

interface IExpedition {
  title: string,
  description: string,
  cards: IExpeditionCard[]
}

interface IExpeditionCard {
  cost: number,
  name: string,
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

  /* public async create(expedition: IExpedition): Promise<IExpedition> {
    if (expedition === null || expedition === undefined) {
      throw new Error("VOTRE EXPEDITION EST INVALIDE");
    }

    const id: string = this.generateId();
    set(ref(database, 'expeditions/' + id), {
      id: id,
      name: expedition.name,
      cost: expedition.cost,
      time: expedition.time
    });

    return expedition;
  } */

  public async get(type: IExpeditionTypes, expeditionNumber: number): Promise<IExpeditionCard> {
    if (expeditionNumber === null || expeditionNumber === undefined) {
      throw new Error("VOTRE EXPEDITION ID EST INVALIDE");
    }
    const snapshot = await get(child(dbRef, `expeditions/${type}/cards/` + expeditionNumber));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('AN ERROR HAS OCCURED');
    }
  }
  /* 
    public async update(contact: IExpedition): Promise<void> {
      if (contact === null || contact === undefined) {
        console.error("VOTRE CONTACT EST INVALIDE");
        return;
      }
      // Get a key for a new Post.
      const id: string | null = push(child(ref(db), 'posts')).key;
	
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates: any = {};
      updates['contacts/' + id] = contact;
      return update(ref(db), updates);
    }
	
    public async delete(contactId: string): Promise<void> {
      if (contactId === null || contactId === undefined) {
        console.error("VOTRE CONTACT ID EST INVALIDE");
        return;
      }
	
      const contacts: IExpedition[] = [];
      const contactListCollection = collection(db, 'appContactList');
      const contactListSnapshot = await getDocs(contactListCollection);
      const contactList = contactListSnapshot.docs.map(doc => doc.data());
      console.log(contactList);
      return contacts;
    }
	
   */
  public generateId(): string {
    return push(child(ref(database), 'expeditions')).key as string;
  }
}
