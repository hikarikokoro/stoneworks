
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  BodyPart,
  Configuration,
  ConfigurationParameters,
  EmailContent,
  EmailMessageData,
  EmailRecipient,
  EmailsService
} from 'elasticemail-angular';
import { environment } from 'src/environments/environment';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {

  public email: string = '';
  public content: string = '';

  public errorEmail: string = '';
  public errorContent: string = '';
  public error: string = '';
  private _emailsService!: EmailsService;

  public allGood: boolean = false;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._emailsService = new EmailsService(this._httpClient, environment.API_BASE_PATH, this.apiConfigFactory())
  }

  private apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
      username: 'stephaniedufour1@hotmail.com',
      password: 'Albert&01',
      withCredentials: true,
      credentials: {
        'apikey': '72CE7044C1849DDCCE8D5F11B554CB984ECA9EA8F841993F30025540A79D10405B6CF825A070F62832A0C4CDFF954941'
      }
    }
    return new Configuration(params);
  }


  public onSubmitClick(): void {
    this.error = '';
    this.errorEmail = '';
    this.errorContent = '';
    this.allGood = false;

    if (this.email === '') {
      this.errorEmail = 'Please enter an email.';
    }
    if (this.content === '') {
      this.errorContent = 'Please enter something.';
    }

    if (!this.isEmailValid()) {
      this.errorEmail = 'Please enter a valid email.';
    }

    if (this.errorEmail !== '' || this.errorContent !== '') {
      this.error = 'There\'s an error in the form';
      return;
    }
    this.sendEmail();
  }

  private isEmailValid(): boolean {
    const pattern: RegExp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    return pattern.test(this.email);
  }

  private async sendEmail(): Promise<void> {
    await SystemService.exec(`node convert-pdf.js "${this.email}"`, undefined);
  }
}
