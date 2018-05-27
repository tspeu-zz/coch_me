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

  }

  postData(conductores ) {
    const newConductores = JSON.stringify(conductores);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });

    return this.http.post(_URL_DB + _CONDUCTORES, newConductores, {headers})
    .map((res) => {

      return res.json();
    });
  }

  // httpClient
  getConfig() {
    return this.httpClient.get(configUrl);
  }

  getUpdate(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.httpClient.get(url);
  }

  putData(datos: any, id$: string) {
    const data = JSON.stringify(datos);
    const headers = new Headers({
        'Content-type': 'aplication/json'
      });
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.http.put(url, data, {headers})
          .map( res => {
            return res.json();
          });
  }

  delData(id$: string) {
    const url = `${configUrlUPDATE}/${id$}.json`;
    return this.http.delete(url)
    .map( res => {
      return res.json();
    });
  }

}
