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
  
  datosGuardados = [];

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
          this.datosGuardados.push(data);
          console.log('this.datosGuardados--> ',this.datosGuardados);
        }
    });  
      this.loadEvents();
      this.myCalendar.loadEvents();

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

// https://github.com/twinssbc/Ionic2-Calendar#instance-methods
    loadEvents() {
        // this.eventSource.push(eve);
      this.eventSource.push({
          title: 'test',
          startTime :  new Date('Mon Apr 02 12:00'),
          endTime :    new Date('Tue Apr 03 12:00'),
          allDay: false,
          persona: 'JM',
          color:   'yellow'
      });
      
      console.log('loadEVENT-> this.eventSource', this.eventSource);
      //this.myCalendar.loadEvents();
      
      console.log('loadEVENT-> this.myCalendar', this.myCalendar);
      
    }
      
      
// 
    pressEvent(e) {
      this.press++;
    }
  
    tapEvent(e) {
      this.tap++;
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