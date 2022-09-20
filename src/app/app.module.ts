import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
