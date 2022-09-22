import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { IRegistrationInformation } from '../expeditions/expedition-interfaces';
import { ExpeditionsService } from '../services/expeditions.service';
import { RegistrationInformationService } from '../services/registrationInformation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public selectedTab: number = 0;
  public title: string = '';
  public type: string = '';
  public expeditionNumber: string = '';
  public tab: string = '';
  public enquire: boolean = false;
  public registrationInformations: IRegistrationInformation[] = [];

  constructor(
    private _expeditionsService: ExpeditionsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(routeParams => {
      this.type = routeParams['type'];
      this.expeditionNumber = routeParams['expeditionNumber'];
      this.tab = routeParams['tab'];
      this.load();
    });
  }

  private async load(): Promise<void> {
    /* this.registrationInformations = await this._registrationInformationService.list();
    if (this.type === 'coldWeather') {
      this.registrationInformations = this.registrationInformations.filter((ri: IRegistrationInformation) => !ri.onlyOutdoors);
    } */

    const expedition = await this._expeditionsService.get(this.type, Number(this.expeditionNumber));
    this.title = expedition.name;
    this.registrationInformations = expedition.registrationInformation;

    if (this.type === 'outdoors' && this.tab === 'cost') {
      this.selectedTab = 3;
    }
  }

}
