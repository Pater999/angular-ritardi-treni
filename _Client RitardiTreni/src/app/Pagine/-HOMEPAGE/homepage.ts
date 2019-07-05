import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Stazione } from '../../../Types/stazione';
import { ServiceViaggiaTreno } from '../../../Services/service-viaggiaTreno';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomepageComponent implements OnInit {
  StazioneSelezionata: string;
  StazioneSelezionataNome: string;
  StazioneLoading = false;
  StazioneTypehead = new Subject<string>();
  noLogin: boolean = false;

  StazioniSalvate: boolean = false;
  ListaStazioniSalvate: any = [];

  Stazioni: Stazione[];
  arrivi: any[];
  partenze: any[];
  public loadingPartenze: boolean = false;
  public loadingArrivi: boolean = false;
  ArriviOPartenze: string = "Partenze";


  public constructor(private meta: Meta, private titleService: Title,
    private sd: ServiceViaggiaTreno,
    private router: Router,
    private route: ActivatedRoute) {
    this.meta.updateTag({ name: 'description', content: 'Benvenuti su Ritarditreni, qui potete consultare gli orari e i ritardi live dei treni di trenitalia e programmare i vostri futuri viaggi con varie soluzioni. Ricerca stazione, ricerca treno, ricerca soluzione' });
  }

  ngOnInit() {
    this.setTitle("Ritardi treni - Homepage");
    this.LoadStazioni();

    this.route.params.subscribe(params => {
      this.arrivi = [];
      this.partenze = [];
      if (params['stazione'] != undefined) {
        this.StazioneSelezionataNome = params['stazione'];
      }
      else {
        this.StazioneSelezionataNome = "Milano Centrale"
      }  
      this.GetIdStazione(this.StazioneSelezionataNome);
    });
  }

  private LoadStazioni() {
    this.StazioneTypehead.pipe(
      tap(() => this.StazioneLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.sd.getStazioni(term)),
    ).subscribe(x => {
      this.Stazioni = x;
      this.StazioneLoading = false;
    }, () => {
      this.Stazioni = [];
    });
  }

  public onChange() {
    this.router.navigate(['/Stazione', this.StazioneSelezionataNome]);
  }

  public onChangeDesktop() {
    this.arrivi = [];
    this.partenze = [];
    this.router.navigate(['/HomePage', this.StazioneSelezionataNome]);
  }

  public CambiaStazioni(value: string) {
    if (value == "Principali") {
      this.StazioniSalvate = false;
      this.noLogin = false;
    }
    else {
      this.StazioniSalvate = true;
      if (localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') != undefined) {
        this.ListaStazioniSalvate = [];
        this.sd.getStazioniSalvate(JSON.parse(localStorage.getItem('currentUser')).data.id).subscribe(res => {
          this.ListaStazioniSalvate = res;
          if (this.ListaStazioniSalvate.length < 1) {
            this.ListaStazioniSalvate[0] = {
              nome_stazione: "Puoi salvare delle stazioni dalla tua area riservata oppure dalla ricerca stazione attraverso la stellina gialla!",
            };
          }
        },
          errorCode => console.log(errorCode)
        );
      }
      else {
        this.ListaStazioniSalvate = [];
        this.noLogin = true;
      }

    }
  }

  public CambiaVisualizzazione(value: string) {
    this.ArriviOPartenze = value;
  }

  private GetIdStazione(nome: string) {
    this.sd.getStazioni(nome)
      .subscribe(res => {
        this.CaricaPartenze(res[0].Id);
        this.CaricaArrivi(res[0].Id);
        this.StazioneSelezionata = res[0].Id;
        this.StazioneSelezionataNome = res[0].Nome;
      },
        errorCode => console.log(errorCode)
      );
  }

  private CaricaPartenze(idStazione: string) {
    this.loadingPartenze = true;
    this.sd.getPartenze(idStazione)
      .subscribe(res => {
        this.partenze = res
        this.loadingPartenze = false;
      },
        errorCode => {
          console.log(errorCode)
          this.loadingPartenze = false;
        }
      );
  }

  private CaricaArrivi(idStazione: string) {
    this.loadingArrivi = true;
    this.sd.getArrivi(idStazione)
      .subscribe(res => {
        this.arrivi = res
        this.loadingArrivi = false;
      },
        errorCode => {
          console.log(errorCode)
          this.loadingArrivi = false;
        }
      );
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}