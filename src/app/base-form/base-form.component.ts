
import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent {

  public email: string = '';
  public content: string = '';

  public errorEmail: string = '';
  public errorContent: string = '';
  public error: string = '';

  public allGood: boolean = false;

  constructor(private _emailService: EmailService) { }

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
    try {
      this._emailService.sendEmailFromContactPage(this.email, this.content);
    } catch (err) {
      console.error(err);
      return;
    }

    this.email = '';
    this.content = '';
  }
}
