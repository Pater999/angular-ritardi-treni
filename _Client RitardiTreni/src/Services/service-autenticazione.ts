import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Jsonp } from '@angular/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    webserver: string = "https://www.ritarditreni.me/webServer";

    login(username: string, password: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        const options = {
            headers,
        };
        var user = {
            username: username,
            password: password
        };
        return this.http.post(this.webserver + '/authenticate', JSON.stringify(user) , options)
            .map(user => {
                // login successful if there's a jwt token in the response
                console.log(user);
                if (user) { // && user.token
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.removeItem('currentUser');
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    iniLogout(): Observable<any> {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        console.log("ini remove currentUser");
        return Observable.of("ini remove currentUser");
    }
}