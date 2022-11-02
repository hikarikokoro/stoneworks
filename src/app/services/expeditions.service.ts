import { Injectable } from '@angular/core';
import {
  child,
  get,
  push
} from 'firebase/database';
import {
  IExpedition,
  IExpeditionCard,
  IExpeditionTypes
} from '../expeditions/expedition-interfaces';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {

  private dbRef;

  constructor(private _firebaseService: FirebaseService) {
    this.dbRef = this._firebaseService.getdbRef();
  }


  public async list(type: string): Promise<IExpedition> {
    const expeditionType = this.getType(type);
    const snapshot = await get(child(this.dbRef, `expeditions/${expeditionType}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('AN ERROR HAS OCCURED');
    }
  }

  public async get(type: string, expeditionNumber: number): Promise<IExpeditionCard> {
    if (expeditionNumber === null || expeditionNumber === undefined) {
      throw new Error("VOTRE EXPEDITION ID EST INVALIDE");
    }
    const expeditionType = this.getType(type);

    const snapshot = await get(child(this.dbRef, `expeditions/${expeditionType}/cards/` + expeditionNumber));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('AN ERROR HAS OCCURED');
    }
  }

  public generateId(): string {
    return push(child(this.dbRef, 'expeditions')).key as string;
  }

  private getType(type: string): IExpeditionTypes {
    let expeditionType: IExpeditionTypes = IExpeditionTypes['outdoors'];

    switch (type) {
      case 'outdoor-experience-programs':
        expeditionType = IExpeditionTypes['outdoors'];
        break;
      case 'cold-weather-preparedness-training':
        expeditionType = IExpeditionTypes['coldWeather'];
        break;
      case 'outdoors':
        expeditionType = IExpeditionTypes['outdoors'];
        break;
      case 'coldWeather':
        expeditionType = IExpeditionTypes['coldWeather'];
        break;
    }

    return expeditionType;
  }
}
