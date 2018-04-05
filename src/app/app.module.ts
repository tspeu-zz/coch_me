import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

//el calendario modal 
import { NgCalendarModule  } from 'ionic2-calendar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocaldataProvider } from '../providers/localdata/localdata';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocaldataProvider
  ]
})
export class AppModule {}
