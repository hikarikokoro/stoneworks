import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.component.html',
  styleUrls: ['./professional-services.component.scss']
})
export class ProfessionalServicesComponent implements OnInit {
  public activatedForm: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
