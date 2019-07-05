import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/service-autenticazione';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public constructor(private router: Router, private authenticationService: AuthenticationService) { }

  CollapseRic: Boolean = false;
  CollapseLogin: Boolean = false;
  toggle: Boolean = false;
  loginFormMenu: FormGroup;
  Loggato: boolean = false;
  username: string = "";
  innerWidth;

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.loginFormMenu = new FormGroup({
      username: new FormControl('', [Validators.minLength(6), Validators.required]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ])
    });

    if (localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') != undefined) {
      this.Loggato = true;
      this.username = JSON.parse(localStorage.getItem('currentUser')).data.username;
    }
  }

  public login() {
    var username = this.loginFormMenu.controls.username.value;
    var password = Md5.hashStr("YYDH1fgzopQrS" + this.loginFormMenu.controls.password.value + "HHFFdDGGE99ee12");
    password = Md5.hashStr(password.toString()).toString();

    this.authenticationService.login(username, password)
      .subscribe(
        data => {
          this.router.navigate([data.data.url]); //this.returnUrl]);
          this.Loggato = true;
          this.username = JSON.parse(localStorage.getItem('currentUser')).data.username;
          this.ChiudiMobile();
        },
        error => {
          if (error.status = 401) {
            this.ChiudiMobile();
            this.router.navigate(["/Login/error"]);
          }
        });
  }

  public logOut() {
    this.authenticationService.logout();
    this.Loggato = false;
    this.username = "";
    window.location.href = "/HomePage";
  }

  public ChiudiMobile() {
    if (innerWidth < 770)
      this.toggle = !this.toggle
  }

}


