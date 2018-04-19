import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { LocaldataProvider } from '../../providers/localdata/localdata';
import { DatosLocal} from '../../providers/localdata/datosLocal'; 

import { CalendarComponent } from "ionic2-calendar/calendar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;
  // eventSource;

  eventSource = [];

  viewTitle= "App test";

  selectedDay = new Date();
  
  title: string;
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  public tap: number = 0;
  public press: number = 0;
  
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
              private localDataService: LocaldataProvider) {

                
    
    }
    
    ionViewDidLoad(){
      // this.localDataService.getDatosLocal();
      // console.log('ETP--|this.localDataService servicio->',  this.localDataService);
      this.localDataService.getData().then((todos) => {
        if(todos){
          let data = todos;
          console.log('get--data', data);
          this.datosGuardados.push(data);
          
          console.log('this.datosGuardados__lenght--> ',this.datosGuardados.length);
          console.log('this.datosGuardados--> ',this.datosGuardados);

          for (let i=0; i< this.datosGuardados.length; i++) {
          
            console.log('this.datosGuardados[i]->', this.datosGuardados[i]);


            this.cargaEvents(this.datosGuardados[i]);
            // this.eventSource.push(this.datosGuardados[i]);
            // console.log('this.eventSource---->', this.eventSource );
          }
         
          this.myCalendar.loadEvents();
    // console.log(' this.myCalendar.loadEvents()', this.myCalendar.loadEvents());
          // cargar lo datos
          // this.myCalendar.loadEvents();
        }
      });  
      // this.datosLocal = this.localDataService.getDatosLocal();
      // console.log('AKI --|this.datosLocal---->',  this.datosLocal);
    }


  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss( data => {
      if (data) {
        let eventData = data;

        console.log("--data->", eventData);
        eventData.startTime = new Date(data.startTime);
        eventData.endTime =   new Date(data.endTime);
        
        let events = this.eventSource;      
        console.log('AAAADEvent -->this.eventSource >', this.eventSource);
        events.push(eventData);
        
        // this.localDataService.setDatosLocaL(eventData);
        this.localDataService.save(eventData);
        console.log("--> save->", eventData);

        // this.myCalendar
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(event) {
    console.log("onViewTitleChanged event-->", event);
    this.title = event;
    // console.log("this.viewTitle-->", this.viewTitle);
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,      
      subTitle: '<strong>' + event.persona + '</strong><br>From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    console.log("AKI onEventSelected-->alert -->",alert);
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  loadEvents() {
    // this.eventSource = this.createRandomEvents();
    this.eventSource = this.datosGuardados;
}
  // https://github.com/twinssbc/Ionic2-Calendar#instance-methods
  cargaEvents(data) {
    // this.eventSource.push(eve);
    console.log('data', data);
      if(data && data.length == 0){
        console.log('data loadEvents ', data);
        console.log('datalenght', data.length);
        let title  = data.title;
        let startTime =  data.startTime;
        console.log('startTime',startTime);
        let endTime = new Date( data.endTime) ;
        console.log('startTime',startTime);
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
          console.log('loadEVENT-> this.eventSource-->', this.eventSource);
          // this.myCalendar.loadEvents();
          // console.log('loadEVENT-> this.myCalendar-->', this.myCalendar);
      }else {
        for (let i=0; i< data.length; i++) {
            console.log('data loadEvents ', data);
            console.log('datalenght', data.length);
            let title  = data[i].title;
            let startTime =  data[i].startTime;
            console.log('startTime',startTime);
            let endTime = new Date( data[i].endTime) ;
            console.log('startTime',startTime);
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
// 
    pressEvent(e) {
      this.press++;
    }
  
    tapEvent(e) {
      this.tap++;
    }

    createRandomEvents() {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
          var date = new Date();
          var eventType = Math.floor(Math.random() * 2);
          var startDay = Math.floor(Math.random() * 90) - 45;
          var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          if (eventType === 0) {
              startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
              if (endDay === startDay) {
                  endDay += 1;
              }
              endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
              events.push({
                  title: 'All Day - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true
              });
          } else {
              var startMinute = Math.floor(Math.random() * 24 * 60);
              var endMinute = Math.floor(Math.random() * 180) + startMinute;
              startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
              endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
              events.push({
                  title: 'Event - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false
              });
          }
      }
      return events;
  }
    
  }
  // loadEvents: function() {
  //   this.eventSource.push({
  //     title: 'test',
  //     startTime: startTime,
  //     endTime: endTime,
  //     allDay: false
  // });
  // this.myCalendar.loadEvents();
  // }