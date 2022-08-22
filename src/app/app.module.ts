import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ErrorComponent } from './error/error.component';
import { ExpeditionsComponent } from './expeditions/expeditions.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { BaseFormComponent } from './base-form/base-form.component';


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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
