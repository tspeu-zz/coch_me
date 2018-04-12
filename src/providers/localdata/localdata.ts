// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


interface DatosLocal { 
  startTime: any , 
  endTime: any , 
  allDay: boolean,
  persona: string,
  color: string, 
  title: string
};

@Injectable()
export class LocaldataProvider {

//array de DATOSLOCAL
  public datos : DatosLocal[];

  // public http: HttpClient,
  constructor( private storage:Storage) {
    console.log('Hello LocaldataProvider Provider');
  }
  getData() {
    console.log('get al DATA->');
    return this.storage.get('datos'); 
  }

  save(data) {
    console.log('salvando a DATA', data);
    this.storage.set('datos', data);
  }

  getDatosLocal() {
    return this.storage.get('datosLocal').then( (data) => {
      if(data !== null){
        this.datos = data;
        console.log('aki -->data', data);
      } else {
        this.datos = [{
          startTime:  Date.parse('Tue Apr 03 2018 12:00:00 GMT+0100'),
          endTime:    Date.parse('Tue Apr 03 2018 12:00:00 GMT+0100'),
          allDay:     true,
          persona:    "JM",
          color:      "yellow",
          title:      "LIDL"
        }];
      }
    });
  }

  removeItem(data) {
    this.storage.remove(data).then(() => {
      console.log('item removed');
    });
  }

  getLocalData(){
    return this.datos;
  }

  setDatosLocaL(data) {
   console.log('<-- local store -->', data);
    this.storage.set('datosLocal', data); 
  }

  dateViewToDb(d) {
    let fech = Date.parse(`'${d}'`);
    return fech;
  }

  dateDbtoView(d) {
    let fecha = new Date(d).toISOString();
    return fecha;
  }
}
