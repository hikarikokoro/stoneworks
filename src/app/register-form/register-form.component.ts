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

  public provincialMedicalCoverage: boolean = false;
  public medicalMedicalCoverage: boolean = false;
  public additionnalInfo: boolean = false;
  public invoiceConf: boolean = false;
  public terms: boolean = false;

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
  public errorAdditionnalInfo: string = '';
  public errorInvoiceConf: string = '';
  public errorTerms: string = '';
  public error: string = '';

  public participants: RegisterFormViewModel[] = [];
  public activeParticipant?: RegisterFormViewModel;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _expeditionService: ExpeditionsService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(routeParams => {
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
