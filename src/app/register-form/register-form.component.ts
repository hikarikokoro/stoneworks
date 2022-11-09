import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import * as _ from 'lodash';
import { EmailService } from '../services/email.service';
import { ExpeditionsService } from '../services/expeditions.service';
import RegisterFormViewModel from './register-form.view-model';

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

  public expedition: IExpeditionCard = {} as IExpeditionCard;
  public errorCalendar: string = '';
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
    private _expeditionService: ExpeditionsService,
    private _emailService: EmailService
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
    this.resetErrorMessages();
    let errors = false;

    for (const participant of this.participants) {
      const isvalid: boolean = participant.areFieldsValid();
      if (!isvalid) {
        errors = true;
      }
    }

    if (this._selectedDates === undefined || this._selectedDates.length === 0) {
      this.errorCalendar = 'Please select a start date.';
      errors = true;
    }

    if (!this.checkbox_1) {
      this.errorCheckbox_1 = 'Must be checked.';
      errors = true;
    }

    if (!this.checkbox_2) {
      this.errorCheckbox_2 = 'Must be checked.';
      errors = true;
    }

    if (!this.checkbox_3) {
      this.errorCheckbox_3 = 'Must be checked.';
      errors = true;
    }

    if (!this.checkbox_4) {
      this.errorCheckbox_4 = 'Must be checked.';
      errors = true;
    }

    if (!this.checkbox_5) {
      this.errorCheckbox_5 = 'Must be checked.';
      errors = true;
    }


    if (!errors) {
      this.sendEmail();
    }
  }

  public addParticipant(): void {
    const last: RegisterFormViewModel = _.last(this.participants);
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

  private resetErrorMessages(): void {
    this.error = '';
    this.errorCalendar = '';
    this.errorCheckbox_1 = '';
    this.errorCheckbox_2 = '';
    this.errorCheckbox_3 = '';
    this.errorCheckbox_4 = '';
    this.errorCheckbox_5 = '';
    this.errorCheckbox_6 = '';
  }

  private async load(type: string, expeditionNumber: number): Promise<void> {
    this.expedition = await this._expeditionService.get(type, expeditionNumber);
  }

  private async sendEmail(): Promise<void> {
    const doc: jsPDF = new jsPDF();
    let position: number = 10;

    const addText = (text: string, doc: jsPDF, position: number, size?: number): number => {
      if (size !== undefined) {
        doc.setFontSize(size);
      }
      doc.text(text, 5, position);
      return position + 7;
    }

    position = addText("Confirmation of submition.", doc, position + 5, 35);
    position = addText("Selected dates", doc, position + 7, 20);

    for (const selectedDate of this._selectedDates) {
      position = addText(selectedDate, doc, position, 16);
    }

    position = position + 15;

    for (const participant of this.participants) {
      doc.addPage();
      position = 10;
      position = addText(participant.firstName + " " + participant.lastName, doc, position + 5, 35);
      position = addText("Base information", doc, position + 10, 20);
      position = addText("Phone number: " + participant.phoneNumber, doc, position, 16);
      position = addText("Email: " + participant.email, doc, position, 16);
      position = addText("Gender: " + participant.gender, doc, position, 16);
      position = addText("Age: " + participant.age, doc, position, 16);
      position = addText("Height: " + participant.height, doc, position, 16);
      position = addText("Weight: " + participant.weight, doc, position, 16);
      position = addText("Is international passport ? " + (participant.isInternationalPassport ? "Yes" : "No"), doc, position + 10, 16);
      if (participant.isInternationalPassport) {
        position = addText("Country of issue: " + participant.passportCountry, doc, position, 16);
        position = addText("Passport number: " + participant.passportNumber, doc, position, 16);
        position = addText("Passport expiration date: " + participant.passportExpirationDate, doc, position, 16);
      }
    }

    doc.save("confirmation.pdf");

    // Send email to Geoff and a confirmation to each participant
    //this._emailService.sendEmailFromRegisterForm('geoff@swsolutions.co', doc.output());
    this._emailService.sendEmailFromRegisterForm('stephaniedufour1@hotmail.com', '', doc.output('bloburl').toString());

    /* for (const participant of this.participants) {
      this._emailService.sendEmailFromRegisterForm(participant.email, doc.output());
    } */
  }
}
