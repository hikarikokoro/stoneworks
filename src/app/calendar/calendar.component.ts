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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private _selectedDates: string[] = [];
  private _numberOfDays: number = 0;
  public namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public currentMonth: string = '';
  public currentYear: number = 0;
  public daysInMonth: number = 0;
  public daysBeforeMonth: number = 0;
  public daysAfterMonth: number = 0;
  public availabilities: number[] = [];
  public firstDateList: number[] = [];
  public firstSelectedDate: string = '';
  public days: CalendarDateViewModel[] = [];

  @Output() public changeSelectedDates: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private _availabilitiesService: AvailabilitiesService) { }

  async ngOnInit(): Promise<void> {
    await this.initialize();
  }

  @Input() public set numberOfDays(v: number) {
    this._numberOfDays = v;
  }

  public async now(): Promise<void> {
    await this.initialize();
  }

  public changeMonth(to: number, max: number): void {
    const nextMonth: number = moment().month(this.currentMonth).month();
    this.currentMonth = moment().month(nextMonth + to).format('MMMM');
    this.firstSelectedDate = '';

    if (nextMonth === max) {
      const currentYear: string = moment().year(this.currentYear + to).format('YYYY');
      this.currentYear = Number(currentYear);
    }

    this.refresh();
  }

  public changeDay(): void {
    for (const day of this.days) {
      day.selected = false;
    }

    this._selectedDates = [];
    for (let i = Number(this.firstSelectedDate); i < this._numberOfDays + Number(this.firstSelectedDate); i++) {
      const selectedDate = this.days.find((d: CalendarDateViewModel) => Number(d.day) === i);
      if (selectedDate !== undefined) {
        selectedDate.selected = true;
        this._selectedDates.push(selectedDate.date.format('YYYY-MM-DD'));
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
    this.firstSelectedDate = date.day;

    this._selectedDates = [];
    for (let i = Number(date.day); i < this._numberOfDays + Number(date.day); i++) {
      const selectedDate = this.days.find((d: CalendarDateViewModel) => Number(d.day) === i);
      if (selectedDate !== undefined) {

        if (!selectedDate.available) {
          for (const day of this.days) {
            day.selected = false;
            this.firstSelectedDate = '';
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
    const availabilitiesStr: string = await this._availabilitiesService.get(this.currentYear, month + 1);
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
    this.firstDateList = JSON.parse(JSON.stringify(newAvailabilities));

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

    this.refresh();
  }

}
