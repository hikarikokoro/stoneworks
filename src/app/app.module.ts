import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  ApiModule,
  BASE_PATH,
  Configuration,
  ConfigurationParameters
} from 'elasticemail-angular';
import { environment } from '../environments/environment';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ErrorComponent } from './error/error.component';
import { ExpeditionsComponent } from './expeditions/expeditions.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterComponent } from './register/register.component';


export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    username: 'stephaniedufour1@hotmail.com',
    password: 'Albert&01',
    withCredentials: true,
    credentials: {
      'apikey': '72CE7044C1849DDCCE8D5F11B554CB984ECA9EA8F841993F30025540A79D10405B6CF825A070F62832A0C4CDFF954941'
    }
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ContactUsComponent,
    ExpeditionsComponent,
    CartComponent,
    PaymentComponent,
    ErrorComponent,
    RegisterComponent,
    RegisterFormComponent,
    AboutUsComponent,
    ProfessionalServicesComponent,
    BaseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
  bootstrap: [AppComponent]
})
export class AppModule { }
