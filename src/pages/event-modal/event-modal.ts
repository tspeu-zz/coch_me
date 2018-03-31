import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';

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


  constructor(public navCtrl: NavController, private navParams: NavParams, 
    public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController) {
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event.startTime = preselectedDate;
      this.event.endTime = preselectedDate;
      this.event.allDay = true;
      this.event.title = this.selectLocation(false);
      this.event.persona =this.personas[3];
  }

  // ionViewDidLoad() {console.log('ionViewDidLoad EventModalPage');}

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
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
            console.log('this.persona', this.persona);
          }
        },
        {
          text: this.personas[1],
          handler: () => {
            this.persona = this.personas[1] ;
            this.selectLocation(true);
            this.event.persona =   this.persona;
            console.log('this.persona', this.persona);
          }
        },
        {
          text: this.personas[2],
          handler: () => {
            this.persona = this.personas[2] ;
            this.selectLocation(true);
            this.event.persona =   this.persona;
            console.log('this.persona', this.persona);
          }
        },
        {
          text: this.personas[3],
          handler: () => {
            this.persona = this.personas[3] ;
            this.selectLocation(false);
            this.event.persona =   this.persona;
            console.log('this.persona', this.persona);
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
    let loc =""
      if(foo === true){
        loc = this.location[0];
      }else{
         loc =this.location[1];
      }
    return loc;  
  }
}
