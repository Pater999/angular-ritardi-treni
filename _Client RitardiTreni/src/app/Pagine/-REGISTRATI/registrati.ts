import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UtentiService } from '../../../Services/service-utenti';
import { Utente } from '../../../Types/utente';
import { Md5 } from 'ts-md5/dist/md5';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'Registrati',
    templateUrl: './registrati.html',
    styleUrls: ['./registrati.css'],
})

export class RegistratiComponent implements OnInit {

    registerForm: FormGroup;
    NonValido: boolean = false;
    UsernamePresente: boolean = false;
    ErroreLatoServer: boolean = false;
    Utente: Utente;
    Registrato = false;

    public constructor(private meta: Meta, private titleService: Title, private UtentiService: UtentiService, private location: Location,private router: Router, private route: ActivatedRoute) {
        this.meta.updateTag({ name: 'description', content: 'Registrati al sito Ritarditreni per salvare le tue tratte e le tue stazioni preferite per una visualizzazione molto più semplice.' });
    }

    ngOnInit() {
        this.setTitle("Ritardi treni - Registrati");

        this.route.params.subscribe(params => {
            if (params['registrato'] == "true")
            {
                this.Registrato = true;
                console.log(this.Registrato)
            }
            else
            {
                console.log(this.Registrato)
                this.registerForm = new FormGroup({
                    username: new FormControl('', [Validators.minLength(5), Validators.maxLength(10), Validators.required]),
                    nome: new FormControl(''),
                    cognome: new FormControl(''),
                    email: new FormControl('', [
                        Validators.pattern("[^ @]*@[^ @]*")
                    ]),
                    password: new FormControl('', [
                        Validators.minLength(5),
                        Validators.required
                    ])
                });
            }
        });
    }


    public Register() {
        if (this.registerForm.invalid) {
            console.log(this.registerForm);
            this.NonValido = true;
        }
        else {
            this.UtentiService.cercaUtente(this.registerForm.controls.username.value).subscribe(res => {
                if (res.length > 0) {
                    this.UsernamePresente = true;
                }
                else {

                    var username = this.registerForm.controls.username.value;
                    if (this.registerForm.controls.nome.value != "")
                        var nome = this.registerForm.controls.nome.value;
                    else
                        var nome = null;
                    if (this.registerForm.controls.cognome.value != "")
                        var cognome = this.registerForm.controls.cognome.value;
                    else
                        var cognome = null;
                    if (this.registerForm.controls.email.value != "")
                        var email = this.registerForm.controls.email.value;
                    else
                        var email = null;

                    var password = Md5.hashStr("YYDH1fgzopQrS" + this.registerForm.controls.password.value + "HHFFdDGGE99ee12");
                    password = Md5.hashStr(password.toString()).toString();

                    this.Utente = new Utente(
                        username,
                        nome,
                        cognome,
                        email,
                        password
                    )

                    this.UtentiService.nuovoUtente(this.Utente)
                        .subscribe(
                            res => {
                                if (res.status == 200)
                                {
                                    this.router.navigate(['/Registrazione', "true"]);
                                }
                                else
                                {
                                    this.ErroreLatoServer = true;
                                }
                            },
                    );

                }
            },
                errorCode => console.log(errorCode)
            );
        }
    }

    private setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

}