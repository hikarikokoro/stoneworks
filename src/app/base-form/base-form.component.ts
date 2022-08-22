import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {

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
    this.error = 'Unknown error';
  }
}
