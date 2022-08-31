
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpeditionsService } from '../services/expeditions.service';

enum IExpeditionTypes {
  'coldWeather' = 'coldWeather',
  'outdoors' = 'outdoors'
}
interface IExpedition {
  title: string,
  subtitle: string,
  description: string,
  extra: any,
  cards: IExpeditionCard[]
}

interface IExpeditionCard {
  cost: number,
  name: string,
  type: string,
  time: number,
  description: string,
  id: string
}
@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  encapsulation: ViewEncapsulation.None
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
    this.expedition = await this._expeditionService.list(type);
  }

}
