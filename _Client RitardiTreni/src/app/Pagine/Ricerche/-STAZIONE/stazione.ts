import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceViaggiaTreno } from '../../../../Services/service-viaggiaTreno';
import { Subject } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Stazione } from '../../../../Types/stazione';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'Ricerca_stazione',
    templateUrl: './stazione.html',
    styleUrls: ['./stazione.css'],
    encapsulation: ViewEncapsulation.None
})

export class ricStazioneComponent implements OnInit {
    constructor(private meta: Meta, 
        private titleService: Title,
        private sd: ServiceViaggiaTreno,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router) { 
            this.meta.updateTag({ name: 'description', content: 'Ricerca una stazione e visualizza i treni in partenza o in arrivo con il relativo ritardo live e il relativo binario di arrivo/partenza' });
        };

    Stazioni: Stazione[];
    id: Stazione[]
    arrivi: any[];
    partenze: any[];

    StazioneSelezionata: string;
    StazioneSelezionataNome: string;
    StazioneLoading = false;
    StazioneTypehead = new Subject<string>();

    public loadingPartenze : boolean  = false;
    public loadingArrivi : boolean  = false;
    
    public layout : boolean = false;

    StazionePreferita : boolean = true;

    ngOnInit() {
        this.setTitle("Ritardi treni - Cerca stazione");

        this.route.params.subscribe(params => {
            this.partenze = [];
            this.arrivi = [];
            if (params['id'] != undefined)
            {
                this.GetIdStazione(params['id']);
                this.isPreferita(params['id']);
            }   
            else
                this.StazioneSelezionata = "";
        });

        this.LoadStazioni();
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

    private GetNomeStazione(id: string) {
        this.StazioneSelezionataNome = this.Stazioni[this.Stazioni.findIndex(i => i.Id === id)].Nome;
    }

    private GetIdStazione(nome: string) {
        this.sd.getStazioni(nome)
            .subscribe(res => {
                this.id = res
                this.CaricaPartenze(this.id[0].Id);
                this.CaricaArrivi(this.id[0].Id);
                this.StazioneSelezionata = this.id[0].Id;
                this.StazioneSelezionataNome = this.id[0].Nome;
            },
                errorCode => console.log(errorCode)
            );
    }

    public onChange() {
        this.GetNomeStazione(this.StazioneSelezionata);
        this.router.navigate(['/Stazione', this.StazioneSelezionataNome]);
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

    public Aggiorna()
    {
        this.partenze = [];
        this.arrivi = [];
        this.CaricaPartenze(this.StazioneSelezionata);
        this.CaricaArrivi(this.StazioneSelezionata);
    }

    public CambiaLayout(tipo : string)
    {
        if (tipo == "Col")
        {
            this.layout = false;

        }
        else
        {
            this.layout = true;

        }
    }

    public MostraMappa()
    {
        this.router.navigate(['/HomePage', this.StazioneSelezionataNome]);
    }

    public AggiungiStazPreferita(Stazione : string)
    {
        if (localStorage.getItem('currentUser')!=null || localStorage.getItem('currentUser')!=undefined ) {
            this.sd.aggiungiStazioneSalvata(JSON.parse(localStorage.getItem('currentUser')).data.username, Stazione).subscribe(res => {
                if (res.status = 200)
                {
                    this.StazionePreferita = true;
                }
            },
                errorCode => {
                    console.log(errorCode)
                }
            );
        }
        else
        {
            this.router.navigate(['/Login/error2']);
        }
    }

    public RimuoviStazPreferita(Stazione : string)
    {
        if (localStorage.getItem('currentUser')!=null || localStorage.getItem('currentUser')!=undefined ) {
            this.sd.rimuoviStazioneSalvata(JSON.parse(localStorage.getItem('currentUser')).data.username, Stazione).subscribe(res => {
                if (res.status = 200)
                {
                    this.StazionePreferita = false;
                }
            },
                errorCode => {
                    console.log(errorCode)
                }
            );      
        }
        else
        {
            this.router.navigate(['/Login/error2']);
        }
    }

    private isPreferita(stazione : string)
    {
        if (localStorage.getItem('currentUser')!=null || localStorage.getItem('currentUser')!=undefined ) {
            this.sd.getIsStazionePreferita(JSON.parse(localStorage.getItem('currentUser')).data.id,stazione).subscribe(res => {
                this.StazionePreferita = res.data.preferito;
            },
                errorCode => {
                    console.log(errorCode)
                }
            );
        }
    }
}
