import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceViaggiaTreno } from '../../../../Services/service-viaggiaTreno';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'Ricerca_treno',
    templateUrl: './treno.html',
    styleUrls: ['./treno.css'],
})

export class ricTrenoComponent implements OnInit {
    public constructor(private meta: Meta, private titleService: Title,
        private sd: ServiceViaggiaTreno,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router) {
            this.meta.updateTag({ name: 'description', content: 'Monitora un treno: conoscendone il numero potrai monitorarlo durante il suo percorso visualizzandone il ritardo ad ogni stazione o punto di controllo' });
         }

    TrenoSelezionato: string;
    TrenoSelezionatoNome: string;
    TrenoStazionePartenza : string;
    MostraTreno: boolean = false;
    Treno: any;
    TrenoPreferito: boolean = false;

    public loadingFermate : boolean  = false;

    ngOnInit() {
        this.setTitle("Ritardi treni - Cerca treno");

        this.route.params.subscribe(params => {
            if ((params['numTreno'] != undefined) && (params['idStaz'] != undefined )) {
                this.MostraTreno = false;
                this.TrenoSelezionato = params['numTreno'];
                this.TrenoSelezionatoNome = params['numTreno'];
                this.TrenoStazionePartenza = params['idStaz'];
                this.isPreferito(params['numTreno'], params['idStaz']);
                this.AndamentoTreno(this.TrenoSelezionato,this.TrenoStazionePartenza);
            }
            else
            {
                this.TrenoSelezionato = "";
                this.MostraTreno = false;
            }
                
        });
    }

    private setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public Keydown(event) {
        if (event.keyCode == 13) {
            this.CercaTreno();
        }
    }

    public CercaTreno() {
        if ((this.TrenoSelezionato != "") && (this.TrenoSelezionato != undefined)) {
            
            this.sd.getAndamentoTrenoRic(this.TrenoSelezionato)
                .subscribe(res => {
                    if (res.length == 0)
                    {
                        alert("Nessun treno con questo numero");
                    }
                    else if (res.length > 1)
                    {
                        this.router.navigate(['/Treno', this.TrenoSelezionato, res[0].idStazione]);
                    }
                    else
                    {
                        this.router.navigate(['/Treno', this.TrenoSelezionato, res.idOrigine]);
                    }
                },
                    errorCode => console.log(errorCode)
                );
        }
        else {
            alert("Attenzione: devi inserire un numero")
        }
    }

    public Aggiorna()
    {
        this.Treno.fermate = [];
        this.MostraTreno = false;
        this.AndamentoTreno(this.TrenoSelezionato,this.TrenoStazionePartenza);
    }

    private AndamentoTreno(numeroTreno: string, idStazione: string) {
        this.loadingFermate = true;
        this.sd.getAndamentoTreno(idStazione, numeroTreno)
            .subscribe(res => {
                this.Treno = res
                console.log(this.Treno)
                this.loadingFermate = false;
                this.MostraTreno = true;
            },
                errorCode => console.log(errorCode)
            );
    }



    public AggiungiTrenoPreferito(Treno : string, Stazione : string)
    {
        if (localStorage.getItem('currentUser')!=null || localStorage.getItem('currentUser')!=undefined ) {
            this.sd.aggiungiTrenoSalvato(JSON.parse(localStorage.getItem('currentUser')).data.username, Treno, Stazione).subscribe(res => {
                if (res.status = 200)
                {
                    this.TrenoPreferito = true;
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

    public RimuoviTrenoPreferito(Treno : string, Stazione : string)
    {
        if (localStorage.getItem('currentUser')!=null || localStorage.getItem('currentUser')!=undefined ) {
            this.sd.rimuoviTrenoSalvato(JSON.parse(localStorage.getItem('currentUser')).data.username,Treno, Stazione).subscribe(res => {
                if (res.status = 200)
                {
                    this.TrenoPreferito = false;
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

    private isPreferito(treno : string, stazione : string)
    {
        if (localStorage.getItem('currentUser')!=null || localStorage.getItem('currentUser')!=undefined ) {
            this.sd.getIsTrenoPreferito(JSON.parse(localStorage.getItem('currentUser')).data.id,treno,stazione).subscribe(res => {
                this.TrenoPreferito = res.data.preferito;
            },
                errorCode => {
                    console.log(errorCode)
                }
            );
        }
    }
}