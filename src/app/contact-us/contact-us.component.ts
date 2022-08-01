import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public email: string = '';
  public title: string = '';
  public content: string = '';

  public errorTitle: string = '';
  public errorEmail: string = '';
  public errorContent: string = '';
  public error: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmitClick(): void {

  }

}
