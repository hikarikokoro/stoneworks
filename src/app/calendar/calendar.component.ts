import { asLiteral } from '@angular/compiler/src/render3/view/util';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AvailabilitiesService } from '../services/availabilities.service';
import CalendarDateViewModel from './calendar-date.view-model';

interface IYearDate {
  [year: string]: IMonthDate
}
interface IMonthDate {
  [month: string]: string
}
interface IAllYearAvailabilities {
  year: string,
  monthNumber: number,
  monthString: string,
  day: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private _selectedDates: string[] = [];
  private _numberOfDays: number = 0;
  private _expeditionType: string = '';
  private _expeditionNumber: string = '';
  public namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public currentMonth: string = '';
  public currentYear: number = 0;
  public daysInMonth: number = 0;
  public daysBeforeMonth: number = 0;
  public daysAfterMonth: number = 0;
  public availabilities: number[] = [];
  public allDatesList: IAllYearAvailabilities[] = [];
  public firstSelectedDate: IAllYearAvailabilities | undefined;
  public days: CalendarDateViewModel[] = [];

  @Output() public changeSelectedDates: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private _availabilitiesService: AvailabilitiesService) { }

  async ngOnInit(): Promise<void> {
    await this.initialize();
  }

  @Input() public set numberOfDays(v: number) {
    this._numberOfDays = v;
  }

  @Input() public set expeditionType(v: string) {
    this._expeditionType = v;
  }

  @Input() public set expeditionNumber(v: string) {
    this._expeditionNumber = v;
  }

  public async now(): Promise<void> {
    await this.initialize();
  }

  public async changeMonth(to: number, max: number): Promise<void> {
    const nextMonth: number = moment().month(this.currentMonth).month();
    this.currentMonth = moment().month(nextMonth + to).format('MMMM');
    this.firstSelectedDate = undefined;

    if (nextMonth === max) {
      const currentYear: string = moment().year(this.currentYear + to).format('YYYY');
      this.currentYear = Number(currentYear);
    }

    await this.refresh();
  }

  public async changeDate(): Promise<void> {
    if (this.firstSelectedDate != undefined) {
      this.currentMonth = this.firstSelectedDate.monthString;
      this.currentYear = Number(this.firstSelectedDate.year);
      this._selectedDates = [];

      await this.refresh();

      for (let i = Number(this.firstSelectedDate.day); i < this._numberOfDays + Number(this.firstSelectedDate.day); i++) {
        const selectedDate = this.days.find((d: CalendarDateViewModel) => Number(d.day) === i);
        if (selectedDate !== undefined) {
          selectedDate.selected = true;
          this._selectedDates.push(selectedDate.date.format('YYYY-MM-DD'));
        }
      }
    }

    this.changeSelectedDates.emit(this._selectedDates);
  }

  public selectDate(date: CalendarDateViewModel): void {
    if (!date.available) {
      return;
    }
    for (const day of this.days) {
      day.selected = false;
    }
    date.selected = true;
    this.firstSelectedDate = _.find(this.allDatesList, (ad: IAllYearAvailabilities) => ad.day === date.day && ad.monthNumber === date.date.month() + 1 && Number(ad.year) === date.date.year());

    this._selectedDates = [];
    for (let i = Number(date.day); i < this._numberOfDays + Number(date.day); i++) {
      const selectedDate = this.days.find((d: CalendarDateViewModel) => Number(d.day) === i);
      if (selectedDate !== undefined) {

        if (!selectedDate.available) {
          for (const day of this.days) {
            day.selected = false;
            this.firstSelectedDate = undefined;
          }
          return;
        }

        selectedDate.selected = true;
        this._selectedDates.push(selectedDate.date.format('YYYY-MM-DD'));
      }
    }

    this.changeSelectedDates.emit(this._selectedDates);
  }

  private async refresh(): Promise<void> {
    var now = moment();
    this.daysInMonth = moment().year(this.currentYear).month(this.currentMonth).daysInMonth();
    this.daysBeforeMonth = moment().year(this.currentYear).month(this.currentMonth).date(1).day();
    const n = moment().year(this.currentYear).month(this.currentMonth).date(this.daysInMonth).day();
    this.daysAfterMonth = 7 - (n + 1);

    const month: number = moment().year(this.currentYear).month(this.currentMonth).month();
    const availabilitiesStr: string = await this._availabilitiesService.get(this._expeditionType, Number(this._expeditionNumber), this.currentYear, month + 1);
    const availabilitiesArr = availabilitiesStr.split(',', 31);
    this.availabilities = availabilitiesArr.map(Number);

    const newAvailabilities = JSON.parse(JSON.stringify(this.availabilities));
    for (const availability of this.availabilities) {
      let canBeSelected: boolean = true;

      for (let i = 0; i < this._numberOfDays; i++) {
        if (!newAvailabilities.includes(availability + i)) {
          canBeSelected = false;
        }
      }

      if (!canBeSelected) {
        const index: number = _.findIndex(newAvailabilities, (na: number) => na === availability);
        if (index !== -1) {
          newAvailabilities.splice(index, 1);
        }
      }
    }

    this.days = [];
    for (let i = 1; i < this.daysInMonth + 1; i++) {
      const date = moment().year(this.currentYear).month(this.currentMonth).date(i);
      const isSameDay: boolean = now.isSame(date, 'day');
      const isSameMonth: boolean = now.isSame(date, 'month');
      let isToday = false;
      if (isSameDay && isSameMonth) {
        isToday = true;
      }

      let available = false;
      if (this.availabilities.includes(i)) {
        available = true;
      }

      let selected = false;
      if (this._selectedDates.includes(i.toString())) {
        selected = true;
      }
      const day = new CalendarDateViewModel(available, date, i.toString(), selected, isToday);
      this.days.push(day);
    }
  }

  private async initialize(): Promise<void> {
    var now = moment();
    this.currentMonth = now.format('MMMM');
    this.currentYear = Number(now.format('YYYY'));

    await this.refresh();

    const allYearAvailabilities: IYearDate | undefined = await this._availabilitiesService.getAvailabilities(this._expeditionType, Number(this._expeditionNumber));
    this.allDatesList = [];
    const allDatesList = [];
    let dates: string[] = [];
    if (allYearAvailabilities !== undefined) {
      for (const [year, monthlyAvailabilities] of Object.entries(allYearAvailabilities)) {
        for (const [monthNumber, datesAsString] of Object.entries(monthlyAvailabilities)) {
          const monthString: string = moment(monthNumber, 'MM').format('MMMM');
          dates = datesAsString.split(',', 31);
          for (const day of dates) {
            const availability: IAllYearAvailabilities = {
              year,
              monthNumber: Number(monthNumber),
              monthString,
              day
            }
            allDatesList.push(availability);
          }
        }
      }

      this.allDatesList = JSON.parse(JSON.stringify(allDatesList));
      for (const availability of allDatesList) {
        let canBeSelected: boolean = true;

        for (let i = 0; i < this._numberOfDays; i++) {
          if (!dates.includes((Number(availability.day) + i).toString())) {
            canBeSelected = false;
          }
        }

        if (!canBeSelected) {
          const index: number = _.findIndex(this.allDatesList, (na: IAllYearAvailabilities) => na.day === availability.day);
          if (index !== -1) {
            this.allDatesList.splice(index, 1);
          }
        }
      }
    }

  }

}
