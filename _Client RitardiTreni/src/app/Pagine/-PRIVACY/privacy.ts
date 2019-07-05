import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'Privacy',
  templateUrl: './privacy.html',
})

export class PrivacyComponent implements OnInit {
    public constructor(private meta: Meta, private titleService: Title ) { 
      this.meta.updateTag({ name: 'description', content: 'Pagina per le informazioni sui cookie di ritarditreni.me' });
    }
    
    ngOnInit() {
      this.setTitle("Ritardi treni - Privacy");
    }
  
    private setTitle( newTitle: string) {
      this.titleService.setTitle( newTitle );
    }
}
