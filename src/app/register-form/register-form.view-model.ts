import * as moment from 'moment';

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
  private _isInternationalPassport: boolean = false;
  private _passportCountry: string = '';
  private _passportNumber: string = '';
  private _passportExpirationDate: string = '';
  private _momentPassportExpirationDate: moment.Moment = moment();
  private _emergencyContactName: string = '';
  private _emergencyContactPhoneNumber: string = '';
  private _medicalInfo: string = '';
  private _allergies: string = '';

  private _errors: boolean = false;
  public errorFirstName: string = '';
  public errorLastName: string = '';
  public errorPhoneNumber: string = '';
  public errorEmail: string = '';
  public errorGender: string = '';
  public errorAge: string = '';
  public errorHeight: string = '';
  public errorWeight: string = '';
  public errorPassportCountry: string = '';
  public errorPassportNumber: string = '';
  public errorPassportExpirationDate: string = '';
  public errorEmergencyContactName: string = '';
  public errorEmergencyContactPhoneNumber: string = '';
  public errorMedicalInfo: string = '';
  public errorAllergies: string = '';

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
  public get isInternationalPassport(): boolean {
    return this._isInternationalPassport;
  }
  public set isInternationalPassport(v: boolean) {
    this._isInternationalPassport = v;
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
  public get errors(): boolean {
    return this._errors;
  }
  public set errors(v: boolean) {
    this._errors = v;
  }

  //#endregion

  //#region Public members

  public areFieldsValid(): boolean {
    this.resetErrorMessages();

    if (this._firstName === '' || this._firstName.length < 3) {
      this.errorFirstName = 'Please enter a valid first name.';
      this.errors = true;
    }

    if (this._lastName === '' || this._lastName.length < 3) {
      this.errorLastName = 'Please enter a valid last name.';
      this.errors = true;
    }

    if (!this.isEmailValid(this._email)) {
      this.errorEmail = 'Please enter a valid email.';
      this.errors = true;
    }

    if (!this.isPhoneValid(this._phoneNumber)) {
      this.errorPhoneNumber = 'Please enter a valid phone number.';
      this.errors = true;
    }

    if (Number(this._age) <= 5) {
      this.errorAge = 'Please enter a valid age.';
      this.errors = true;
    }

    console.log('passport', this.errors);
    if (this._isInternationalPassport) {
      if (this._passportCountry === '') {
        this.errorPassportCountry = 'Please enter a valid passport country.';
        this.errors = true;
      }

      if (this._passportNumber === '') {
        this.errorPassportNumber = 'Please enter a valid passport number.';
        this.errors = true;
      }

      this._momentPassportExpirationDate = moment(this._passportExpirationDate, "YYYY-MM-DDTHH:mm");

      if (this._passportExpirationDate === '' || !this._momentPassportExpirationDate.isValid()) {
        this.errorPassportExpirationDate = 'Please enter a valid passport expiration date.';
        this.errors = true;
      }

    }

    return !this.errors;
  }

  //#endregion

  //#region Private members

  private isEmailValid(email: string): boolean {
    const pattern: RegExp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    return pattern.test(email);
  }

  private isPhoneValid(email: string): boolean {
    const pattern: RegExp = new RegExp("(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})");
    return pattern.test(email);
  }

  private resetErrorMessages(): void {
    this._errors = false;
    this.errorFirstName = '';
    this.errorLastName = '';
    this.errorPhoneNumber = '';
    this.errorEmail = '';
    this.errorGender = '';
    this.errorAge = '';
    this.errorHeight = '';
    this.errorWeight = '';
    this.errorPassportCountry = '';
    this.errorPassportNumber = '';
    this.errorPassportExpirationDate = '';
    this.errorEmergencyContactName = '';
    this.errorEmergencyContactPhoneNumber = '';
    this.errorMedicalInfo = '';
    this.errorAllergies = '';
  }

  //#endregion
}
