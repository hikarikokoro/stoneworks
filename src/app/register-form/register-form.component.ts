import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpeditionsService } from '../services/expeditions.service';

enum IExpeditionTypes {
  coldWeather,
  outdoors
}
interface IExpeditionCard {
  cost: number,
  name: string,
  type: string,
  time: number,
  description: string
}
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public gender: string = '';
  public age: string = '';
  public height: number = 0;
  public weight: number = 0;
  public passportInformation: string = '';
  public emergencyContactName: string = '';
  public emergencyContactPhoneNumber: string = '';
  public medicalInfo: string = '';
  public provincialMedicalCoverage: boolean = false;

  public expedition: IExpeditionCard = {} as IExpeditionCard;
  public errorFirstName: string = '';
  public errorLastName: string = '';
  public errorPhoneNumber: string = '';
  public errorEmail: string = '';
  public errorGender: string = '';
  public errorAge: string = '';
  public errorHeight: string = '';
  public errorWeight: string = '';
  public errorPassportInformation: string = '';
  public errorEmergencyContactName: string = '';
  public errorEmergencyContactPhoneNumber: string = '';
  public errorMedicalInfo: string = '';
  public errorProvincialMedicalCoverage: string = '';
  public error: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _expeditionService: ExpeditionsService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(routeParams => {
      this.load(routeParams['type'], routeParams['expeditionNumber']);
    });
  }

  public onSubmitClick(): void {

  }

  private async load(type: string, expeditionNumber: number): Promise<void> {
    let expeditionType: IExpeditionTypes = IExpeditionTypes.coldWeather;
    switch (type) {
      case "coldWeather":
        expeditionType = IExpeditionTypes.coldWeather;
        break;
      case "outdoors":
        expeditionType = IExpeditionTypes.outdoors;
        break;
    }
    this.expedition = await this._expeditionService.get(expeditionType, expeditionNumber);
  }
}
