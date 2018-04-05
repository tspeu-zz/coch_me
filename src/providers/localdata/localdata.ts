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

  getDatosLocal() {
    
    this.storage.get('datosLocal').then( (data) => {
      if(data !== null){
        this.datos = data;
        console.log('aki -->data', data);
      } else {

        // this.datos = [{
        //   startTime:  Date.parse('Tue Apr 03 2018 12:00:00 GMT+0100'),
        //   endTime:    Date.parse('Tue Apr 03 2018 12:00:00 GMT+0100'),
        //   allDay:     true,
        //   persona:    "JM",
        //   color:      "yellow",
        //   title:      "LIDL"
        // }];
      }
    });
    return this.datos;

  }

  setDatosLocaL(data) {
    // this.datos = data;
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
