import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { LocaldataProvider } from '../../providers/localdata/localdata';



@IonicPage()
@Component({
  selector: 'page-grupos',
  templateUrl: 'grupos.html',
})
export class GruposPage {

  event = { 
    persona: "",
    lugar: "", 
    grupo: "",
    title: "",
    color: "",

  };

  persona : string ="";
  location = ["ALCAMPO", "LIDL"];
  personas =["VIDAL", "DAVID", "FRAN", "JM"];
  lugar = '';
  colores =['blue', 'green', 'red', 'yellow'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GruposPage');
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'AÑADIR NUEVA PERSONA AL GRUPO',
      buttons: [
        {
          text: " VAMOS AL ITER",
          handler: () => {
            this.persona = 'NUEVA PERSONA' ;
            this.selectLocation(true);
            this.event.persona =   this.persona;

            this.event.title = this.persona + " | " + this.lugar;
            this.event.color = this.colores[0];
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }


  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

  selectLocation(foo){
    if(foo === true){
      this.lugar = this.location[0];
    }else{
      this.lugar = this.location[1];
    }
    return this.lugar;  
  }

  addPersonas(){
    console.log('add perona al grupo');
  }
}
