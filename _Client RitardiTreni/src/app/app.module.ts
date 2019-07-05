import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CookieLawModule } from 'angular2-cookie-law';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './Pagine/-HOMEPAGE/homepage';
import { InformazioniComponent } from './Pagine/-INFORMAZIONI/informazioni';
import { RegistratiComponent } from './Pagine/-REGISTRATI/registrati';
import { ricStazioneComponent } from './Pagine/Ricerche/-STAZIONE/stazione';
import { ricTrenoComponent } from './Pagine/Ricerche/-TRENO/treno';
import { ricViaggioComponent } from './Pagine/Ricerche/-VIAGGIO/viaggio';
import { ServiceViaggiaTreno } from '../Services/service-viaggiaTreno';
import { SoluzioniComponent } from './Pagine/-SOLUZIONI/soluzioni';
import { DatePipe } from '@angular/common'
import { Error404Component } from './Pagine/-ERROR404/error404';
import { ResponsiveModule } from 'ng2-responsive'
import { UtentiService } from '../Services/service-utenti';
import { LoginComponent } from './Pagine/-LOGIN/login';
import { AuthGuard } from './_guards/auth.guards';
import { AuthenticationService } from '../Services/service-autenticazione';
import { UserHomePageComponent } from './Pagine/AreaRiservata/-PAGINAPRINCIPALE/paginaprincipale';
import { UserImpostazioniComponent } from './Pagine/AreaRiservata/-IMPOSTAZIONI/impostazioni';
import { PrivacyComponent } from './Pagine/-PRIVACY/privacy';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    InformazioniComponent,
    RegistratiComponent,
    ricStazioneComponent,
    ricTrenoComponent,
    ricViaggioComponent,
    SoluzioniComponent,
    Error404Component,
    LoginComponent,
    UserHomePageComponent,
    UserImpostazioniComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    FormsModule, 
    NgSelectModule, 
    BrowserAnimationsModule,
    MatDatepickerModule,
    NgbModule.forRoot(),
    ResponsiveModule,
    MatNativeDateModule,
    NgxPaginationModule,
    CookieLawModule, 
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.chasingDots,
      backdropBackgroundColour: 'rgba(5,5,5,0)', 
      backdropBorderRadius: '4px',
      primaryColour: '#4CFFE2', 
      secondaryColour: '#4CFFE2', 
      tertiaryColour: '#4CFFE2'
  })
  ],
  providers: [
    Title,
    DatePipe,
    ServiceViaggiaTreno, 
    UtentiService,
    AuthenticationService,
    AuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'it'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
