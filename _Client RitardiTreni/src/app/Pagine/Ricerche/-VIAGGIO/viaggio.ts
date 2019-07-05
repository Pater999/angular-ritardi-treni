import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepicker } from '@angular/material/datepicker';
import { Stazione } from '../../../../Types/stazione';
import { Subject } from 'rxjs';
import { ServiceViaggiaTreno } from '../../../../Services/service-viaggiaTreno';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'Ricerca_viaggio',
    templateUrl: './viaggio.html',
    styleUrls: ['./viaggio.css'],
    encapsulation: ViewEncapsulation.None
})

export class ricViaggioComponent implements OnInit {
    public constructor(private meta: Meta, private titleService: Title, private sd: ServiceViaggiaTreno, private router: Router) {
        this.meta.updateTag({ name: 'description', content: 'Ottieni un elenco di soluzioni di viaggio tra due stazioni: partenza e arrivo. Ti verranno mostrati orari, cambi da effettuare ed un prezzo indicativo!' });
     }

    StazioneSelezionataArrivo: string;
    StazioneSelezionataPartenza: string;
    StazioneLoadingArrivo = false;
    StazioneLoadingPartenza = false;
    StazioneTypeheadArrivo = new Subject<string>();
    StazioneTypeheadPartenza = new Subject<string>();

    AndataRitorno: boolean = false;

    OrarioAndata: string = "9";
    DataAndata: Date = new Date();;

    OrarioRitorno: string = "9";
    DataRitorno: Date = new Date();;

    DataOdierna: Date = new Date();

    minDataAndata: Date = new Date();
    minDataRitorno: Date = new Date();

    StazioniPartenza: any[];
    StazioniArrivo: any[];

    ngOnInit() {
        this.setTitle("Ritardi treni - Cerca viaggio");

        this.LoadStazioniPartenza();
        this.LoadStazioniArrivo();

    }

    private setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    private LoadStazioniPartenza() {
        this.StazioneTypeheadPartenza.pipe(
            tap(() => this.StazioneLoadingPartenza = true),
            distinctUntilChanged(),
            debounceTime(700),
            switchMap(term => this.sd.getStazioniViaggi(term)),
        ).subscribe(x => {
            this.StazioniPartenza = x;
            this.StazioneLoadingPartenza = false;
        }, () => {
            this.StazioniPartenza = [];
        });
    }

    private LoadStazioniArrivo() {
        this.StazioneTypeheadArrivo.pipe(
            tap(() => this.StazioneLoadingArrivo = true),
            distinctUntilChanged(),
            debounceTime(700),
            switchMap(term => this.sd.getStazioniViaggi(term)),
        ).subscribe(x => {
            this.StazioniArrivo = x;
            this.StazioneLoadingArrivo = false;
        }, () => {
            this.StazioniArrivo = [];
        });
    }

    public CambioDataAndata(data: Date) {
        this.minDataRitorno = data;
        this.DataAndata = data;
        if (this.DataAndata > this.DataRitorno) {
            this.DataRitorno = this.DataAndata
        }
    }

    public CercaSoluzioni()
    {
        if ((this.StazioneSelezionataPartenza == "") || (this.StazioneSelezionataPartenza == undefined))
        {
            alert("Inserire la stazione di partenza!");
        }
        else if ((this.StazioneSelezionataArrivo == "") || (this.StazioneSelezionataArrivo == undefined))
        {
            alert("Inserire la stazione di arrivo!");
        }
        else
        {

            this.router.navigate(['/Viaggio/Soluzioni/', this.StazioneSelezionataPartenza,this.StazioneSelezionataArrivo,this.DataAndata.toDateString(),this.OrarioAndata,this.DataRitorno.toDateString(),this.OrarioRitorno,this.AndataRitorno,"Andata"]);
        }
        
    }
}