import { Injectable } from '@angular/core';
import { Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Stazione } from '../Types/stazione';
import { DatePipe } from '@angular/common'


@Injectable()
export class ServiceViaggiaTreno {
  constructor(private http: HttpClient, public datepipe: DatePipe) { }
  webserver: string = "https://orariritarditreni.altervista.org/API/8f6f57f05820875e649c7c27e24aa99d";


  getStazioni(nome: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('nome', nome)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/AutoCompletaStazioni.php", options)
      .map(res => res as Stazione[]);
  }

  getStazioniViaggi(nome: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('nome', nome)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/AutoCompletaStazioniNew.php", options)
      .map(res => res as any[]);
  }

  getArrivi(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('id', id)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/Arrivi.php", options)
      .map(res => res as any[]);
  }

  getPartenze(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('id', id)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/Partenze.php", options)
      .map(res => res as any[]);
  }

  getAndamentoTreno(idStaz: string, idTren: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('idStaz', idStaz)
      .set('idTren', idTren)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/andamentoTreno.php", options)
      .map(res => res as any[]);
  }

  getAndamentoTrenoRic(idTren: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('id', idTren)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/cercaStazioneDaTreno.php", options)
      .map(res => res as any[]);
  }

  getSoluzioniAndata(partenza, arrivo, dataAndata: Date, oraAndata): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('origin', partenza)
      .set('destination', arrivo)
      .set('arflag', "A")
      .set('adate', this.datepipe.transform(dataAndata, 'dd/MM/yyyy'))
      .set('atime', oraAndata)
      .set('adultno', "1")
      .set('childno', "0")
      .set('direction', "A")
      .set('frecce', "false")
      .set('onlyRegional', "false");
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/Soluzioni.php", options)
      .map(res => res as any[]);
  }

  getCoordinateStazioni(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/CoordinateStazioni.php", options)
      .map(res => res as any[]);
  }

  getCoordinateStazioniPrincipali(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/CoordinateStazioniPrincipali.php", options)
      .map(res => res as any[]);
  }

  getCoordinataStazione(nome: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('nome', nome)
    const options = {
      headers,
      params
    };
    return this.http
      .get(this.webserver + "/StazioneCoordinate.php", options)
      .map(res => res as any);
  }

  getIsStazionePreferita(user_id: string, stazione: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers,
    };
    var data = {
      id: user_id,
      stazione: stazione,
      token : JSON.parse(localStorage.getItem('currentUser')).data.token
    };
    return this.http.post(this.webserver + '/stazionePreferita.php', JSON.stringify(data), options)
      .map(res => res as any);
  }

  aggiungiStazioneSalvata(username: string, stazione: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers,
    };
    var data = {
      username: username,
      stazione: stazione,
      token : JSON.parse(localStorage.getItem('currentUser')).data.token
    };
    return this.http.post(this.webserver + '/nuovaStazionePreferita.php', JSON.stringify(data), options)
      .map(res => res as any);
  }

  rimuoviStazioneSalvata(username: string, stazione: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('username', username)
      .set('stazione', stazione)
      .set('token', JSON.parse(localStorage.getItem('currentUser')).data.token)
    const options = {
      headers,
      params
    };
    return this.http.delete(this.webserver + '/deleteStazionePreferita.php', options)
      .map(res => res as any);
  }

  getIsTrenoPreferito(user_id: string, treno:string, stazione: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers,
    };
    var data = {
      id: user_id,
      treno:treno,
      stazione: stazione,
      token : JSON.parse(localStorage.getItem('currentUser')).data.token
    };
    return this.http.post(this.webserver + '/trenoPreferito.php', JSON.stringify(data), options)
      .map(res => res as any);
  }

  aggiungiTrenoSalvato(username: string, treno:string, stazione: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers,
    };
    var data = {
      username: username,
      treno: treno,
      stazione: stazione,
      token : JSON.parse(localStorage.getItem('currentUser')).data.token
    };
    return this.http.post(this.webserver + '/nuovoTrenoPreferito.php', JSON.stringify(data), options)
      .map(res => res as any);
  }

  rimuoviTrenoSalvato(username: string, treno:string, stazione: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('username', username)
      .set('treno', treno)
      .set('stazione', stazione)
      .set('token', JSON.parse(localStorage.getItem('currentUser')).data.token)
    const options = {
      headers,
      params
    };
    return this.http.delete(this.webserver + '/deleteTrenoPreferito.php', options)
      .map(res => res as any);
  }

  getStazioniSalvate(id: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers,
    };
    var data = {
      id: id,
      token : JSON.parse(localStorage.getItem('currentUser')).data.token
    };
    return this.http.post(this.webserver + '/stazioniSalvate.php', JSON.stringify(data), options)
      .map(res => res as any[]);
  }

  getTreniSalvati(id: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers,
    };
    var data = {
      id: id,
      token : JSON.parse(localStorage.getItem('currentUser')).data.token
    };
    return this.http.post(this.webserver + '/treniSalvati.php', JSON.stringify(data), options)
      .map(res => res as any[]);
  }
}
