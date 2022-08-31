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
  public passportCountry: string = '';
  public passportNumber: string = '';
  public passportExpirationDate: string = '';
  public emergencyContactName: string = '';
  public emergencyContactPhoneNumber: string = '';
  public medicalInfo: string = '';
  public allergies: string = '';
  public provincialMedicalCoverage: boolean = false;
  public medicalMedicalCoverage: boolean = false;

  public expedition: IExpeditionCard = {} as IExpeditionCard;
  public errorFirstName: string = '';
  public errorLastName: string = '';
  public errorPhoneNumber: string = '';
  public errorEmail: string = '';
  public errorGender: string = '';
  public errorAge: string = '';
  public errorHeight: string = '';
  public errorWeight: string = '';
  public errorPassportCountry: string = '';
  public errorPassportNumber: string = '';
  public errorPassportExpirationDate: string = '';
  public errorEmergencyContactName: string = '';
  public errorEmergencyContactPhoneNumber: string = '';
  public errorMedicalInfo: string = '';
  public errorAllergies: string = '';
  public errorProvincialMedicalCoverage: string = '';
  public errorMedicalMedicalCoverage: string = '';
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
    this.expedition = await this._expeditionService.get(type, expeditionNumber);
  }
}
