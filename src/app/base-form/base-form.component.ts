
import {
  Component,
  OnInit
} from '@angular/core';
//import {} from 'elasticemail-angular';

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

  public allGood: boolean = false;

  constructor() { }

  ngOnInit(): void {
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

  private sendEmail(): void {
    /* Email.send({
      Host: "smtp.elasticemail.com",
      Username: "stephaniedufour1@hotmail.com",
      Password: "Albert&01",
      To: 'stephaniedufour1@hotmail.com',
      From: this.email,
      Subject: "From contact us page",
      Body: this.content
    }).then(
      this.allGood = true
    ).catch(
      console.error("THERE IS AN ERROR")
    ); */
  }
}
