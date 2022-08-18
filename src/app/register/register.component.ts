import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationInformationService } from '../services/registrationInformation.service';

interface IRegistrationInformation {
  name: string,
  description: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public selectedTab: number = 0;
  public type: string = '';
  public expeditionNumber: string = '';
  public registrationInformations: IRegistrationInformation[] = [];

  constructor(
    private _registrationInformationService: RegistrationInformationService,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.registrationInformations = await this._registrationInformationService.list();

    this._activatedRoute.params.subscribe(routeParams => {
      this.type = routeParams['type'];
      this.expeditionNumber = routeParams['expeditionNumber'];
    });
  }

}
