
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpeditionsService } from '../services/expeditions.service';
import { IExpedition } from './expedition-interfaces';

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
