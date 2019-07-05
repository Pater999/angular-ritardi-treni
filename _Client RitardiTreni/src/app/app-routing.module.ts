import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pagine/-HOMEPAGE/homepage';
import { InformazioniComponent } from './Pagine/-INFORMAZIONI/informazioni';
import { ricStazioneComponent } from './Pagine/Ricerche/-STAZIONE/stazione';
import { ricTrenoComponent } from './Pagine/Ricerche/-TRENO/treno';
import { ricViaggioComponent } from './Pagine/Ricerche/-VIAGGIO/viaggio';
import { RegistratiComponent } from './Pagine/-REGISTRATI/registrati';
import { SoluzioniComponent } from './Pagine/-SOLUZIONI/soluzioni';
import { Error404Component } from './Pagine/-ERROR404/error404';
import { LoginComponent } from './Pagine/-LOGIN/login';
import { AuthGuard } from './_guards/auth.guards';
import { UserImpostazioniComponent } from './Pagine/AreaRiservata/-IMPOSTAZIONI/impostazioni';
import { UserHomePageComponent } from './Pagine/AreaRiservata/-PAGINAPRINCIPALE/paginaprincipale';
import { PrivacyComponent } from './Pagine/-PRIVACY/privacy';

const appRoutes: Routes = [
  { path: 'HomePage/:stazione', component: HomepageComponent },
  { path: 'HomePage', component: HomepageComponent },
  { path: 'Error404', component: Error404Component },
  { path: 'Privacy', component: PrivacyComponent },
  { path: 'Stazione/:id', component: ricStazioneComponent },
  { path: 'Stazione', component: ricStazioneComponent },
  { path: 'Treno/:numTreno/:idStaz', component: ricTrenoComponent },
  { path: 'Treno', component: ricTrenoComponent },
  { path: 'Viaggio', component: ricViaggioComponent },
  { path: 'Viaggio/Soluzioni/:partenza/:arrivo/:dataAndata/:oraAndata/:dataRitorno/:oraRitorno/:andataRitorno/:And_Rit', component: SoluzioniComponent },
  { path: 'Informazioni', component: InformazioniComponent },
  { path: 'Registrazione/:registrato', component: RegistratiComponent },
  { path: 'Registrazione', component: RegistratiComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Login/:errore', component: LoginComponent },
  { path: 'User/impostazioni', component: UserImpostazioniComponent, canActivate: [AuthGuard] },
  { path: 'User/paginaPrincipale/:idStaz/:idTreno/:idStazTreno', component: UserHomePageComponent, canActivate: [AuthGuard] },
  { path: 'User/paginaPrincipale', component: UserHomePageComponent, canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent },
  { path: '**', redirectTo: '/Error404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }