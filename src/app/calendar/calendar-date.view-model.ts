export default class CalendarDateViewModel {
  //#region Private members

  private _available: boolean;
  private _date: moment.Moment;
  private _day: string;
  private _selected: boolean;
  private _today: boolean;

  //#endregion

  //#region Constructors

  constructor()
  constructor(
    available: boolean,
    date: moment.Moment,
    day: string,
    selected: boolean,
    today: boolean)
  constructor(
    available?: boolean,
    date?: moment.Moment,
    day?: string,
    selected?: boolean,
    today?: boolean) {
    this._available = available as boolean;
    this._date = date as moment.Moment;
    this._day = day as string;
    this._selected = selected as boolean;
    this._today = today as boolean;
  }

  //#endregion

  //#region Properties

  public get available(): boolean {
    return this._available;
  }
  public set available(v: boolean) {
    this._available = v;
  }
  public get date(): moment.Moment {
    return this._date;
  }
  public set date(v: moment.Moment) {
    this._date = v;
  }
  public get day(): string {
    return this._day;
  }
  public set day(v: string) {
    this._day = v;
  }
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(v: boolean) {
    this._selected = v;
  }
  public get today(): boolean {
    return this._today;
  }
  public set today(v: boolean) {
    this._today = v;
  }

  //#endregion

}
