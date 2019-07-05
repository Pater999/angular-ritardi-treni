import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'Informazioni',
  templateUrl: './informazioni.html',
})

export class InformazioniComponent implements OnInit {
    public constructor(private meta: Meta, private titleService: Title ) { 
      this.meta.updateTag({ name: 'description', content: 'Pagina sulle funzionalità ed informazioni del sito RitardiTreni. Ecco un elenco delle ricerche (treno, stazione, viaggio)' });
    }
    
    ngOnInit() {
      this.setTitle("Ritardi treni - Informazioni");
    }
  
    private setTitle( newTitle: string) {
      this.titleService.setTitle( newTitle );
    }
}
