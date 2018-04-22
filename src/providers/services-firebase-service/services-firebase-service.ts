import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/RX';

const _URL_DB = 'https://smart-home-78b50.firebaseio.com/';
const _CONDUCTORES = 'conductores.json';
const _URL_UPDATE = 'conductores';
// https://smart-home-78b50.firebaseio.com/conductores/

const configUrl = _URL_DB + _CONDUCTORES;
const configUrlUPDATE = _URL_DB +  _URL_UPDATE;

@Injectable()
export class ServicesFirebaseServiceProvider {

  conductores = [];
  item: Array<any> = [];

  constructor(private http: Http, public httpClient: HttpClient) {
    console.log('Hello ServicesFirebaseServiceProvider Provider');
  }

  postData(conductores ) {
    const newConductores = JSON.stringify(conductores);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });

    return this.http.post(_URL_DB + _CONDUCTORES, newConductores, {headers})
    .map((res) => {
      console.log('res->', res.json());
      return res.json();
    });
  }

  // httpClient
  getConfig() {
    return this.httpClient.get(configUrl);
  }

  getUpdate(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    console.log('configUrlUPDATE', configUrlUPDATE);
    return this.httpClient.get(url);
  }

  putPresupuesto(datos: any, id$: string) {
    const data = JSON.stringify(datos);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.http.put(url, data, {headers})
          .map( res => {
            console.log('akiiiiiiii- update',  res.json());
            return res.json();
          });
  }

  delPresupuesto(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.http.delete(url)
    .map( res => {
      console.log('akiiiiiiii- delete',  res.json());
      return res.json();
    });
  }

}
