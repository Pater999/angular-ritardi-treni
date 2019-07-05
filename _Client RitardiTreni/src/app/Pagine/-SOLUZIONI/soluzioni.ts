import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceViaggiaTreno } from '../../../Services/service-viaggiaTreno';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'Soluzioni',
  templateUrl: './soluzioni.html',
  styleUrls: ['./soluzioni.css'],
})

export class SoluzioniComponent implements OnInit {

  public constructor(private meta: Meta, private titleService: Title, private route: ActivatedRoute, private router: Router,
    private location: Location, private sd: ServiceViaggiaTreno) {
    this.meta.updateTag({ name: 'description', content: 'Ottieni un elenco di soluzioni di viaggio tra due stazioni: partenza e arrivo. Ti verranno mostrati orari, cambi da effettuare ed un prezzo indicativo!' });
  }

  stazionePartenza: string;
  stazioneArrivo: string;
  AndataRitorno: boolean;
  dataRitorno: Date;
  dataAndata: Date;
  oraRitorno: string;
  oraAndata: string;
  today: string;
  dataAndataString: string;
  Informazioni : boolean = false;
  Soluzione : any;
  Andata_Ritorno : string = "andata";
  BtnAndataRitorno : string;

  Soluzioni: any[];
  public loadingSoluzioni: boolean = false;

  ngOnInit() {
    this.Soluzioni = [];
    this.setTitle("Ritardi treni - Soluzioni");
    this.today = new Date().toJSON().split('T')[0];
    this.Informazioni = false;

    this.route.params.subscribe(params => {
      this.Soluzioni = undefined;
      this.Informazioni = false;
      this.stazionePartenza = params['partenza'];
      this.stazioneArrivo = params['arrivo'];
      this.dataAndata = new Date(params['dataAndata']);
      this.dataAndataString = new Date(this.dataAndata.getTime() - (this.dataAndata.getTimezoneOffset() * 60000)).toJSON().split('T')[0];
      this.oraAndata = params['oraAndata'];
      if (params['andataRitorno'] == "false")
      {
        this.AndataRitorno = false;
      }
      else
      {
        this.AndataRitorno = true;
      }

      this.oraRitorno = params['oraRitorno'];
      this.dataRitorno = new Date(params['dataRitorno']);
      this.Andata_Ritorno = params['And_Rit'];
      if (this.Andata_Ritorno == "Andata")
      {
        this.BtnAndataRitorno = "Ritorno" 
      }
      else
      {
        this.BtnAndataRitorno = "Andata"
      }
      

      this.loadSoluzioni();
    });

    this.loadSoluzioni();
  }

  private loadSoluzioni() {
    this.loadingSoluzioni = true;
    this.sd.getSoluzioniAndata(this.stazionePartenza, this.stazioneArrivo, this.dataAndata, this.oraAndata)
      .subscribe(res => {
        this.Soluzioni = res;
        console.log(this.Soluzioni);
        this.loadingSoluzioni = false;
      },
        errorCode => {
          console.log(errorCode)
          this.loadingSoluzioni = false;
        }
      );
  }

  public CercaSoluzioni() {
    this.router.navigate(['/Viaggio/Soluzioni/', this.stazionePartenza, this.stazioneArrivo, new Date(this.dataAndataString).toDateString(), this.oraAndata, this.dataRitorno.toDateString(), this.oraRitorno, this.AndataRitorno,this.Andata_Ritorno]);
  }


  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  private AltreInfo(soluzione : any)
  {
    this.Soluzione = soluzione;
    console.log(soluzione);
    this.Informazioni = true;
  }

  public backClicked() {
    this.location.back();
  }

  public MostraRitorno() {
    if (this.Andata_Ritorno == "Andata")
    {
      this.Andata_Ritorno = "Ritorno";
    }
    else
    {
      this.Andata_Ritorno = "Andata";
    }
    this.router.navigate(['/Viaggio/Soluzioni/', this.stazioneArrivo,this.stazionePartenza,this.dataRitorno.toDateString(), this.oraRitorno, this.dataAndata.toDateString(),this.oraAndata,this.AndataRitorno,this.Andata_Ritorno]);
  }

}
