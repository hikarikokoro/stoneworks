import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  throwError
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  //baseUrl = `${environment.server_URL}/api/email`;
  baseUrl = `/api/email`;

  constructor(private http: HttpClient) {
  }

  sendEmailFromContactPage(email: string, content: string) {
    return this.http.post<any>(`${this.baseUrl}/contact`, { email, content })
      .subscribe(error => {
        if (error !== undefined && error !== null) {
          throw new error('SOMETHING WENT WRONG WHEN WRITTING THE EMAIL.');
        }
      })
  }

  sendEmailFromRegisterForm(body: any) {
    return this.http.post<any>(`${this.baseUrl}/register-form`, body)
      .subscribe(error => {
        if (error !== undefined && error !== null) {
          throw new error('SOMETHING WENT WRONG WHEN WRITTING THE EMAIL.');
        }
      })
  }

}