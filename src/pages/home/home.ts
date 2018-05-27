import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { LocaldataProvider } from '../../providers/localdata/localdata'; 

import { CalendarComponent } from "ionic2-calendar/calendar";

import { ServicesFirebaseServiceProvider  } from '../../providers/services-firebase-service/services-firebase-service';

import {GruposPage } from '../grupos/grupos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;

  eventSource = [];

  viewTitle= "App test";

  selectedDay = new Date();
  
  title: string;
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  postUrl : string;
  conductores = [];

  datosGuardados = [
    // {
    //   startTime: new Date().toISOString(), 
    //   endTime: new Date().toISOString(), 
    //   allDay: false,
    //   persona: "",
    //   color: "", 
    //   title: ""
    // }
];

  datos = [{
      startTime:  "Tue Apr 03",
      endTime:    "Tue Apr 03",
      allDay:     true,
      persona:    "JM",
      color:      "yellow",
      title:      "LIDL"
    }];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, 
              private alertCtrl: AlertController, 
              private localDataService: LocaldataProvider,
              private firebeService: ServicesFirebaseServiceProvider ) {}
    
    ionViewDidLoad(){
      this.getAllData();
      // this.myCalendar.loadEvents();
//LOCAL STORE
      // this.localDataService.getData().then((todos) => {
      //   if(todos){
      //     let data = todos;
      //     console.log('get--data', data);
      //     this.datosGuardados.push(data);
      //     console.log('this.datosGuardados__lenght--> ',this.datosGuardados.length);
      //     console.log('this.datosGuardados--> ',this.datosGuardados);
      //     for (let i=0; i< this.datosGuardados.length; i++) {        
      //       console.log('this.datosGuardados[i]->', this.datosGuardados[i]);
      //       this.cargaEvents(this.datosGuardados[i]);           
      //     }   
      //     // this.getAllData();
      //     this.myCalendar.loadEvents();
      //   }
      // });  
    }


  addEvent() {
    let modal = this.modalCtrl.create(
                'EventModalPage', {selectedDay: this.selectedDay});
    modal.present();

    modal.onDidDismiss( data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime =   new Date(data.endTime);     
        let events = this.eventSource;      
        events.push(eventData);     
        this.localDataService.save(eventData);
      
        this.firebeService.postData(eventData)
          .subscribe( (newPres) => {
        });
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(event) {
    this.title = event;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,      
      subTitle: '<strong>' + event.persona + '</strong><br>From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  loadEvents() {
    this.eventSource = this.conductores;
}
  cargaEvents(data) {
      if(data && data.length == 0){
        let title  = data.title;
        let startTime =  data.startTime;
        let endTime = new Date( data.endTime) ;
        let allDay = false;
        let persona = data.persona;
        let color =   data.color;
          // this.eventSource.push(data);  
          this.eventSource.push({
            title: title,
            startTime :  startTime,
            endTime :    endTime,
            allDay: allDay,
            persona: persona,
            color:   color
          });
      }else {
        for (let i=0; i< data.length; i++) {
            let title  = data[i].title;
            let startTime =  data[i].startTime;
            let endTime = new Date( data[i].endTime) ;
            let allDay = false;
            let persona = data[i].persona;
            let color =   data[i].color;

          this.eventSource.push({
            title: title,
            startTime :  startTime,
            endTime :    endTime,
            allDay: allDay,
            persona: persona,
            color:   color
          });
        }
      }
    }

      // TODO pasarlo al servicio proveedores
  getAllData() {
    this.firebeService.getConfig().subscribe( res => {
        // tslint:disable-next-line:forin
        for ( const id$ in res) {
          const p = res[id$];
          p.id$ = id$;
          this.conductores.push(res[id$]);
        }

      for (let i=0; i< this.conductores.length; i++) {        
        let title  = this.conductores[i].title;
        let startTime =  new Date(this.conductores[i].startTime);

        let endTime = new Date( this.conductores[i].endTime) ;

        let allDay = false;
        let persona = this.conductores[i].persona;
        let color =   this.conductores[i].color;

          this.eventSource.push({
            title: title,
            startTime :  startTime,
            endTime :    endTime,
            allDay: allDay,
            persona: persona,
            color:   color
          });    
      }   
      this.myCalendar.loadEvents();
    });
  }
//TODO
  deleteData(){}

  goToOtherPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(GruposPage);

  }

}
