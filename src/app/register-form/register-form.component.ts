import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ExpeditionsService } from '../services/expeditions.service';
import RegisterFormViewModel from './register-form.view-model';

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
  private _selectedDates: string[] = [];

  public checkbox_1: boolean = false;
  public checkbox_2: boolean = false;
  public checkbox_3: boolean = false;
  public checkbox_4: boolean = false;
  public checkbox_5: boolean = false;
  public checkbox_6: boolean = false;
  public isInternationalPassport: boolean = false;

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
  public errorCheckbox_1: string = '';
  public errorCheckbox_2: string = '';
  public errorCheckbox_3: string = '';
  public errorCheckbox_4: string = '';
  public errorCheckbox_5: string = '';
  public errorCheckbox_6: string = '';
  public error: string = '';

  public participants: RegisterFormViewModel[] = [];
  public activeParticipant?: RegisterFormViewModel;
  public expeditionType: string = '';
  public expeditionNumber: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _expeditionService: ExpeditionsService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(routeParams => {
      this.expeditionType = routeParams['type'];
      this.expeditionNumber = routeParams['expeditionNumber'];
      this.load(routeParams['type'], routeParams['expeditionNumber']);
    });

    const id = 0;
    const participant: RegisterFormViewModel = new RegisterFormViewModel(id, '', '', '', '', '', 20, 170, 54, '', '', '', '', '', '', '');
    this.participants.push(participant);
    this.activeParticipant = participant;
  }

  public get selectedDates(): string[] {
    return this._selectedDates;
  }
  public changeSelectedDates(dates: string[]) {
    this._selectedDates = dates;
  }

  public onSubmitClick(): void {
    this.error = '<i class="fa-solid fa-triangle-exclamation"></i> There has been an error... try again in a few minutes';
  }

  public addParticipant(): void {
    const last = _.last(this.participants);
    const id = last!.id + 1;
    const participant: RegisterFormViewModel = new RegisterFormViewModel(id, '', '', '', '', '', 20, 170, 54, '', '', '', '', '', '', '');
    this.participants.push(participant);
  }

  public changeActiveParticipant(v: number): void {
    const participant = _.find(this.participants, (p: RegisterFormViewModel) => p.id === v);
    this.activeParticipant = participant
  }

  public removeParticipant(v: number): void {
    const index = _.findIndex(this.participants, (p: RegisterFormViewModel) => p.id === v);
    this.participants.splice(index, 1);

    if (this.activeParticipant!.id === v) {
      this.activeParticipant = this.participants[0];
    }
  }

  private async load(type: string, expeditionNumber: number): Promise<void> {
    this.expedition = await this._expeditionService.get(type, expeditionNumber);
  }
}
