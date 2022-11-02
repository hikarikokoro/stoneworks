import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  RouterModule,
  Routes
} from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ErrorComponent } from './error/error.component';
import { ExpeditionsComponent } from './expeditions/expeditions.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PartnersComponent } from './partners/partners.component';
import { PaymentComponent } from './payment/payment.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'expeditions/:type', component: ExpeditionsComponent },
  { path: 'register/:type/:expeditionNumber', component: RegisterComponent },
  { path: 'register/:type/:expeditionNumber/:tab', component: RegisterComponent },
  { path: 'registration-form/:type/:expeditionNumber', component: RegisterFormComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'professional-services', component: ProfessionalServicesComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'cart', component: CartComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'partners', component: PartnersComponent },
  { path: '**', component: ErrorComponent },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'top'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
