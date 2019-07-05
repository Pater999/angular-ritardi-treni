import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../Services/service-autenticazione';
import { Md5 } from 'ts-md5';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class LoginComponent implements OnInit {
  public constructor(private router: Router, private route: ActivatedRoute, private meta: Meta, private titleService: Title, private authenticationService: AuthenticationService) {
    this.meta.updateTag({ name: 'description', content: 'Pagina di login del sito ritarditreni.me' });
  }

  loginForm: FormGroup;
  errore: boolean = false;
  errore2: boolean = false;

  ngOnInit() {
    this.setTitle("Ritardi treni - Login");

    this.route.params.subscribe(params => {
      if (params['errore'] == "error")
        this.errore = true;
      if (params['errore'] == "error2")
        this.errore2 = true;
    });

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.minLength(6), Validators.required]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ])
    });
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public Login() {

    var username = this.loginForm.controls.username.value;
    var password = Md5.hashStr("YYDH1fgzopQrS" + this.loginForm.controls.password.value + "HHFFdDGGE99ee12");
    password = Md5.hashStr(password.toString()).toString();

    this.authenticationService.login(username, password)
      .subscribe(
        data => {
          window.location.reload();
          this.router.navigate([data.data.url]); //this.returnUrl]);
        },
        error => {
          this.router.navigate(["/Login/error"]);
        });
  }

  public ChiudiErrore() {
    this.errore = false;
    this.router.navigate(["/Login"]);
  }

  public ChiudiErrore2() {
    this.errore2 = false;
    this.router.navigate(["/Login"]);
  }
}
