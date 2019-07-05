import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Utente } from '../Types/utente';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UtentiService {

    constructor(private http: HttpClient) { }
    webserver: string = "https://orariritarditreni.altervista.org/API/8f6f57f05820875e649c7c27e24aa99d";

    cercaUtente(username: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        const params = new HttpParams()
            .set('username', username)
        const options = {
            headers,
            params
        };
        return this.http
            .get(this.webserver + "/cercaUtente.php", options)
            .map(res => res as any[]);
    }

    nuovoUtente(user: Utente) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        return this.http.put(this.webserver + "/nuovoUtente.php", JSON.stringify(user), {headers})
        .map(response => response as Response);
    }

    aggiornaUtente(nome : string, cognome : string, email : string)
    {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        var data = {
            "nome" : nome,
            "cognome" : cognome,
            "email": email,
            "username": JSON.parse(localStorage.getItem('currentUser')).data.username,
            "token":JSON.parse(localStorage.getItem('currentUser')).data.token
        }
        return this.http.put(this.webserver + "/cambiaInformazioni.php", JSON.stringify(data), {headers})
        .map(response => response as Response);
    }

    aggiornaPassword(vecchiaPassword : string, nuovaPassword)
    {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        var data = {
            "vecchiaPassword" : vecchiaPassword,
            "nuovaPassword" : nuovaPassword,
            "username": JSON.parse(localStorage.getItem('currentUser')).data.username,
            "token":JSON.parse(localStorage.getItem('currentUser')).data.token
        }
        return this.http.put(this.webserver + "/cambiaPassword.php", JSON.stringify(data), {headers})
        .map(response => response as Response);
    }

    getInformazioniUtente()
    {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        var data = {
            "id" : JSON.parse(localStorage.getItem('currentUser')).data.id,
            "token":JSON.parse(localStorage.getItem('currentUser')).data.token
        }
        return this.http.post(this.webserver + "/informazioniUtente.php", JSON.stringify(data), {headers})
        .map(response => response as Response);
    }
}