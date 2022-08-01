import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpeditionsService } from '../services/expeditions.service';

enum IExpeditionTypes {
  'northern' = 'northern',
  'outdoors' = 'outdoors'
}
interface IExpedition {
  title: string,
  description: string,
  cards: IExpeditionCard[]
}

interface IExpeditionCard {
  cost: number,
  name: string,
  time: number,
  description: string
}
@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss']
})
export class ExpeditionsComponent implements OnInit {

  public expedition!: IExpedition;

  constructor(
    private _expeditionService: ExpeditionsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this._activatedRoute.params.subscribe(routeParams => {
      this.loadExpeditions(routeParams['type']);
    });
  }

  private async loadExpeditions(type: string): Promise<void> {
    let expeditionType: IExpeditionTypes = IExpeditionTypes['outdoors'];
    if (type === 'outdoor-experience-programs') {
      expeditionType = IExpeditionTypes['outdoors'];
    } else if (type === 'northern-preparedness-training') {
      expeditionType = IExpeditionTypes['northern']
    }
    this.expedition = await this._expeditionService.list(expeditionType);
  }

}
