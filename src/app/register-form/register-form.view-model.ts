export default class RegisterFormViewModel {
  //#region Private members

  private _id: number = 0;
  private _firstName: string = '';
  private _lastName: string = '';
  private _email: string = '';
  private _phoneNumber: string = '';
  private _gender: string = '';
  private _age: number = 20;
  private _height: number = 0;
  private _weight: number = 0;
  private _passportCountry: string = '';
  private _passportNumber: string = '';
  private _passportExpirationDate: string = '';
  private _emergencyContactName: string = '';
  private _emergencyContactPhoneNumber: string = '';
  private _medicalInfo: string = '';
  private _allergies: string = '';

  //#endregion

  //#region Constructors

  constructor()
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    gender: string,
    age: number,
    height: number,
    weight: number,
    passportCountry: string,
    passportNumber: string,
    passportExpirationDate: string,
    emergencyContactName: string,
    emergencyContactPhoneNumber: string,
    medicalInfo: string,
    allergies: string)
  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    gender?: string,
    age?: number,
    height?: number,
    weight?: number,
    passportCountry?: string,
    passportNumber?: string,
    passportExpirationDate?: string,
    emergencyContactName?: string,
    emergencyContactPhoneNumber?: string,
    medicalInfo?: string,
    allergies?: string) {
    this._id = id as number;
    this._firstName = firstName as string;
    this._lastName = lastName as string;
    this._email = email as string;
    this._phoneNumber = phoneNumber as string;
    this._gender = gender as string;
    this._age = age as number;
    this._height = height as number;
    this._weight = weight as number;
    this._passportCountry = passportCountry as string;
    this._passportNumber = passportNumber as string;
    this._passportExpirationDate = passportExpirationDate as string;
    this._emergencyContactName = emergencyContactName as string;
    this._emergencyContactPhoneNumber = emergencyContactPhoneNumber as string;
    this._medicalInfo = medicalInfo as string;
    this._allergies = allergies as string;
  }

  //#endregion

  //#region Properties

  public get id(): number {
    return this._id;
  }
  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(v: string) {
    this._firstName = v;
  }
  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(v: string) {
    this._lastName = v;
  }
  public get email(): string {
    return this._email;
  }
  public set email(v: string) {
    this._email = v;
  }
  public get phoneNumber(): string {
    return this._phoneNumber;
  }
  public set phoneNumber(v: string) {
    this._phoneNumber = v;
  }
  public get gender(): string {
    return this._gender;
  }
  public set gender(v: string) {
    this._gender = v;
  }
  public get age(): number {
    return this._age;
  }
  public set age(v: number) {
    this._age = v;
  }
  public get height(): number {
    return this._height;
  }
  public set height(v: number) {
    this._height = v;
  }
  public get weight(): number {
    return this._weight;
  }
  public set weight(v: number) {
    this._weight = v;
  }
  public get passportCountry(): string {
    return this._passportCountry;
  }
  public set passportCountry(v: string) {
    this._passportCountry = v;
  }
  public get passportNumber(): string {
    return this._passportNumber;
  }
  public set passportNumber(v: string) {
    this._passportNumber = v;
  }
  public get passportExpirationDate(): string {
    return this._passportExpirationDate;
  }
  public set passportExpirationDate(v: string) {
    this._passportExpirationDate = v;
  }
  public get emergencyContactName(): string {
    return this._emergencyContactName;
  }
  public set emergencyContactName(v: string) {
    this._emergencyContactName = v;
  }
  public get emergencyContactPhoneNumber(): string {
    return this._emergencyContactPhoneNumber;
  }
  public set emergencyContactPhoneNumber(v: string) {
    this._emergencyContactPhoneNumber = v;
  }
  public get medicalInfo(): string {
    return this._medicalInfo;
  }
  public set medicalInfo(v: string) {
    this._medicalInfo = v;
  }
  public get allergies(): string {
    return this._allergies;
  }
  public set allergies(v: string) {
    this._allergies = v;
  }

  //#endregion

  //#region Public members

  public validateFields(): boolean {
    return false;
  }

  //#endregion

}
