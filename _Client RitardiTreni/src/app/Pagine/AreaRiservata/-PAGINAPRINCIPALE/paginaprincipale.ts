import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceViaggiaTreno } from '../../../../Services/service-viaggiaTreno';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'UserHomePage',
  templateUrl: './paginaprincipale.html',
  styleUrls: ['./paginaprincipale.css'],
})



export class UserHomePageComponent implements OnInit {
  public constructor(private meta: Meta, private titleService: Title, private sd: ServiceViaggiaTreno, private route: ActivatedRoute, private router: Router) {
    this.meta.updateTag({ name: 'description', content: "Pagina principale per l'utente" });
  }

  ListaStazioniSalvate: any = [];
  ListaTreniSalvati: any = [];
  partenze: any = [];
  loading: boolean = false;
  loadingFermate: boolean = false;
  Treno: any = [];
  MostraTreno: boolean = false;

  TrenoPreferito: string = "null";
  TrenoPreferitoStaz: string = "null";
  StazionePreferita: string = "null";

  ngOnInit() {
    this.setTitle("Ritardi treni - " + JSON.parse(localStorage.getItem('currentUser')).data.username);

    this.route.params.subscribe(params => {
      this.partenze = [];
      if ((params['idStaz'] != "null") && (params['idStaz'] != undefined)) {
        this.StazionePreferita = params['idStaz'];
        this.GetIdStazione(params['idStaz']);
      }
      else {
        this.StazionePreferita = "null";
      }
      if ((params['idTreno'] != "null") && (params['idTreno'] != undefined)) {
        this.TrenoPreferito = params['idTreno'];
        this.TrenoPreferitoStaz = params['idStazTreno'];
        this.AndamentoTreno(this.TrenoPreferito, this.TrenoPreferitoStaz);
      }
      else {
        this.TrenoPreferito = "null";
        this.TrenoPreferitoStaz = "null";
      }
    });

    this.CaricaStazioniSalvate();
    this.CaricaTreniSalvati();
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  private CaricaStazioniSalvate() {
    this.sd.getStazioniSalvate(JSON.parse(localStorage.getItem('currentUser')).data.id).subscribe(res => {
      this.ListaStazioniSalvate = res;
      if ((this.ListaStazioniSalvate.length > 0) && (this.StazionePreferita == "null")) {
        this.GetIdStazione(this.ListaStazioniSalvate[0].nome_stazione);
        this.StazionePreferita = this.ListaStazioniSalvate[0].nome_stazione;
      }
    },
      errorCode => console.log(errorCode)
    );
  }

  private GetIdStazione(nome: string) {
    this.sd.getStazioni(nome)
      .subscribe(res => {
        this.CaricaPartenze(res[0].Id);
      },
        errorCode => console.log(errorCode)
      );
  }

  private CaricaPartenze(idStazione: string) {
    this.loading = true;
    this.sd.getPartenze(idStazione)
      .subscribe(res => {
        this.partenze = res
        this.loading = false;

      },
        errorCode => {
          console.log(errorCode)
          this.loading = false;
        }
      );
  }



  private AndamentoTreno(numeroTreno: string, idStazione: string) {
    this.MostraTreno = false
    this.loadingFermate = true;
    this.sd.getAndamentoTreno(idStazione, numeroTreno)
      .subscribe(res => {
        this.Treno = res
        this.MostraTreno = true
        this.loadingFermate = false;
      },
        errorCode => {
          console.log(errorCode)
          this.loadingFermate = false;
        }
      );
  }

  private CaricaTreniSalvati() {
    this.sd.getTreniSalvati(JSON.parse(localStorage.getItem('currentUser')).data.id).subscribe(res => {
      this.ListaTreniSalvati = res;
      if ((this.ListaTreniSalvati.length > 0) && (this.TrenoPreferito == "null")) {
        this.TrenoPreferito = this.ListaTreniSalvati[0].id_treno;
        this.TrenoPreferitoStaz = this.ListaTreniSalvati[0].id_stazione;
        this.AndamentoTreno(this.TrenoPreferito, this.TrenoPreferitoStaz);
      }
    },
      errorCode => console.log(errorCode)
    );
  }

  public CambiaTreno(value) {
    this.router.navigate(['/User/paginaPrincipale/' + this.StazionePreferita + "/" + value.split('|')[0] + "/" + value.split('|')[1]]);
  }

  public CambiaStazione(value) {
    this.router.navigate(['/User/paginaPrincipale/' + value + "/" + this.TrenoPreferito + "/" + this.TrenoPreferitoStaz]);
  }

}
