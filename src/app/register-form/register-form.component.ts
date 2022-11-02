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
    let errors = false;
    //this.error = '<i class="fa-solid fa-triangle-exclamation"></i> There has been an error... try again in a few minutes';

    this.error = '';

    for (const participant of this.participants) {
      const isvalid: boolean = participant.areFieldsValid();
      if (!isvalid) {
        errors = true;
      }
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

  private async load(type: string, expeditionNumber: number): Promise<void> {
    this.expedition = await this._expeditionService.get(type, expeditionNumber);
  }


  private async sendEmail(): Promise<void> {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });

    doc.text("Hello world!", 1, 1);
    doc.save("two-by-four.pdf");
    console.log("DONE");
    //this._emailService.sendEmailFromRegisterForm(this.email, this.content);
  }
}
