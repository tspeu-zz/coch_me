import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { LocaldataProvider } from '../../providers/localdata/localdata';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  
  event = { startTime: new Date().toISOString(), 
            endTime: new Date().toISOString(), 
            allDay: false,
            persona: "",
            color: "", 
            title: ""
          };

  minDate = new Date().toISOString();
  persona : string ="";
  location = ["ALCAMPO", "LIDL"];
  personas =["VIDAL", "DAVID", "FRAN", "JM"];
  lugar = '';
  colores =['blue', 'green', 'red', 'yellow'];

  constructor(public navCtrl: NavController, private navParams: NavParams, 
              public viewCtrl: ViewController, 
              public actionSheetCtrl: ActionSheetController, 
              private localDataProvider : LocaldataProvider) {

      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event.startTime = preselectedDate;
      this.event.endTime = preselectedDate;
      this.event.allDay = true;
      // this.selectLocation(false);
      // this.event.title = this.location[1];
      // this.event.persona =this.personas[3];
      // this.event.color = this.colores[3];
      
                
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
    // this.localDataProvider.getDatosLocal();
    // console.log('this.localDataProvider-->', this.localDataProvider.datos); 
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    // this.localDataProvider.setDatosLocaL();
    this.viewCtrl.dismiss(this.event);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Quien lleva el coche?',
      buttons: [
        {
          text: this.personas[0],
          handler: () => {
            this.persona = this.personas[0] ;
            this.selectLocation(true);
            this.event.persona =   this.persona;
            this.event.title = this.persona + " | " + this.lugar;
            this.event.color = this.colores[0];
            // console.log('this.persona', this.persona);
          }
        },
        {
          text: this.personas[1],
          handler: () => {
            this.persona = this.personas[1] ;
            this.selectLocation(true);
            this.event.persona =   this.persona;
            this.event.title =this.persona + " | " + this.lugar;
            this.event.color = this.colores[1];
            // console.log('this.persona', this.persona);
          }
        },
        {
          text: this.personas[2],
          handler: () => {
            this.persona = this.personas[2] ;
            this.selectLocation(true);
            this.event.persona =   this.persona;
            this.event.title = this.persona + " | " + this.lugar;
            this.event.color = this.colores[2];
            // console.log('this.persona', this.persona);
          }
        },
        {
          text: this.personas[3],
          handler: () => {
            this.persona = this.personas[3] ;
            this.selectLocation(false);
            this.event.persona =   this.persona;
            this.event.title = this.persona + " | " + this.lugar;
            this.event.color = this.colores[3];
            // console.log('this.persona', this.persona);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  selectLocation(foo){
   
    if(foo === true){
      this.lugar = this.location[0];
    }else{
      this.lugar = this.location[1];
    }
    return this.lugar;  
  }
}
