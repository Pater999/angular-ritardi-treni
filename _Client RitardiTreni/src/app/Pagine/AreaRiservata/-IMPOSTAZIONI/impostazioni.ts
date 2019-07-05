import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServiceViaggiaTreno } from '../../../../Services/service-viaggiaTreno';
import { UtentiService } from '../../../../Services/service-utenti';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'UserImpostazioni',
  templateUrl: './impostazioni.html',
})

export class UserImpostazioniComponent implements OnInit {
  public constructor(private meta: Meta, private titleService: Title, private modalService: NgbModal, private sd: ServiceViaggiaTreno, private sdUtenti: UtentiService) {
    this.meta.updateTag({ name: 'description', content: 'Pagina di impostazioni per gli utenti' });
  }

  StazioniTreni: string = "Stazioni";
  username: string;
  utenteForm: FormGroup;
  passwordForm: FormGroup;
  closeResult: string;
  Aggiornato: boolean = false;
  ErroreVecchiaPass: boolean = false;
  ErroreNuovaPass: boolean = false;
  ListaStazioniSalvate: any = [];
  ListaTreniSalvati: any = [];
  TrenoDaAggiungere: number;
  ErroreTreno: boolean = false;
  StazioniAggiungere: any = [];
  GiaAggiunta: boolean = false;
  SalvatoInfo: boolean = false;
  p3;
  p2;
  p1;


  ngOnInit() {
    this.setTitle("Ritardi treni - " + JSON.parse(localStorage.getItem('currentUser')).data.username + " Impostazioni");

    this.CaricaStazioniSalvate();
    this.CaricaTreniSalvati();

    this.CaricaStazioniAggiungere("A");

    var username = JSON.parse(localStorage.getItem('currentUser')).data.username;

    this.InformazioniUtente();
    this.utenteForm = new FormGroup({
      username: new FormControl(username, [Validators.minLength(6), Validators.required]),
      nome: new FormControl(''),
      cognome: new FormControl(''),
      email: new FormControl('', [
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
    });

    this.passwordForm = new FormGroup({
      vecchiapassword: new FormControl('', [Validators.minLength(6), Validators.required]),
      nuovaPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
      nuovaPassword2: new FormControl('', [Validators.minLength(6), Validators.required]),
    });

  }

  private CaricaStazioniAggiungere(stringa: string) {
    if (stringa == "" || stringa == undefined) {
      stringa = "A";
    }
    this.sd.getStazioni(stringa).subscribe(res => {
      this.StazioniAggiungere = res;
    },
      errorCode => {
        console.log(errorCode)
      }
    );
  }

  private InformazioniUtente() {
    this.sdUtenti.getInformazioniUtente()
      .subscribe(
        res => {
          this.utenteForm.setValue({
            username: JSON.parse(localStorage.getItem('currentUser')).data.username,
            nome: res[0].nome,
            cognome: res[0].cognome,
            email: res[0].email
          })
        },
    );
  }


  public TextBoxChange(value: string) {
    this.CaricaStazioniAggiungere(value);
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public CambiaVisualizzazione(value: string) {
    this.StazioniTreni = value;
  }

  public SalvaForm() {
    this.sdUtenti.aggiornaUtente(this.utenteForm.controls.nome.value, this.utenteForm.controls.cognome.value, this.utenteForm.controls.email.value)
      .subscribe(
        res => {
          if (res.status == 200) {
            this.SalvatoInfo = true
            this.InformazioniUtente();
          }
          else {
            console.log("ERRORE")
          }
        },
    );
  }

  public AggiungiStazione(stazione: string) {
    this.sd.aggiungiStazioneSalvata(JSON.parse(localStorage.getItem('currentUser')).data.username, stazione).subscribe(res => {
      if (res.status = 200) {
        this.GiaAggiunta = false;
        this.CaricaStazioniSalvate();
      }
    },
      errorCode => {
        console.log(errorCode)
        this.GiaAggiunta = false;
      }
    );
  }

  public AggiungiTreno() {
    if (this.TrenoDaAggiungere == undefined) {
      this.ErroreTreno = true;
    }
    else {
      this.sd.getAndamentoTrenoRic(this.TrenoDaAggiungere.toString())
        .subscribe(res => {
          if (res.length == 0) {
            this.ErroreTreno = true;
            this.TrenoDaAggiungere = undefined;
          }
          else if (res.length > 1) {
            this.sd.aggiungiTrenoSalvato(JSON.parse(localStorage.getItem('currentUser')).data.username, this.TrenoDaAggiungere.toString(), res[0].idStazione).subscribe(res => {
              if (res.status = 200) {
                this.CaricaTreniSalvati();
                this.TrenoDaAggiungere = undefined;
              }
            },
              errorCode => {
                console.log(errorCode)
              }
            );
          }
          else {
            this.sd.aggiungiTrenoSalvato(JSON.parse(localStorage.getItem('currentUser')).data.username, this.TrenoDaAggiungere.toString(), res.idOrigine).subscribe(res => {
              if (res.status = 200) {
                this.CaricaTreniSalvati();
                this.TrenoDaAggiungere = undefined;
              }
            },
              errorCode => {
                console.log(errorCode)
              }
            );
          }
        },
          errorCode => console.log(errorCode)
        );
    }

  }

  public OnDelStazione(stazione: string) {
    this.sd.rimuoviStazioneSalvata(JSON.parse(localStorage.getItem('currentUser')).data.username, stazione).subscribe(res => {
      if (res.status = 200) {
        this.CaricaStazioniSalvate();
      }
    },
      errorCode => {
        console.log(errorCode)
      }
    );
  }

  public OnDelTreno(treno: string, stazione: string) {
    this.sd.rimuoviTrenoSalvato(JSON.parse(localStorage.getItem('currentUser')).data.username, treno, stazione).subscribe(res => {
      if (res.status = 200) {
        this.CaricaTreniSalvati();
      }
    },
      errorCode => {
        console.log(errorCode)
      }
    );
  }

  public CambiaPassword() {
    this.Aggiornato = true;
    if (this.passwordForm.controls.nuovaPassword.value == this.passwordForm.controls.nuovaPassword2.value) {

      var nuovapassword = Md5.hashStr("YYDH1fgzopQrS" + this.passwordForm.controls.nuovaPassword.value + "HHFFdDGGE99ee12");
      nuovapassword = Md5.hashStr(nuovapassword.toString()).toString();

      var vecchiapassword = Md5.hashStr("YYDH1fgzopQrS" + this.passwordForm.controls.vecchiapassword.value + "HHFFdDGGE99ee12");
      vecchiapassword = Md5.hashStr(vecchiapassword.toString()).toString();

      this.sdUtenti.aggiornaPassword(vecchiapassword,nuovapassword).subscribe(res => {
        console.log(res);
        if (res.status != 200) {
          this.ErroreVecchiaPass = true;
        }
      },
        errorCode => {
          console.log(errorCode)
        }
      );
    }
    else
    {
      this.ErroreNuovaPass = true;
    }
    
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.Aggiornato = false;
      this.ErroreNuovaPass = false;
      this.ErroreVecchiaPass = false;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.Aggiornato = false;
      this.ErroreVecchiaPass = false;
      this.ErroreNuovaPass = false;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private CaricaStazioniSalvate() {
    this.sd.getStazioniSalvate(JSON.parse(localStorage.getItem('currentUser')).data.id).subscribe(res => {
      this.ListaStazioniSalvate = res;
    },
      errorCode => console.log(errorCode)
    );
  }

  private CaricaTreniSalvati() {
    this.sd.getTreniSalvati(JSON.parse(localStorage.getItem('currentUser')).data.id).subscribe(res => {
      this.ListaTreniSalvati = res;
    },
      errorCode => console.log(errorCode)
    );
  }

}
