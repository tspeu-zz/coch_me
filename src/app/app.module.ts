import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';



//el calendario modal 
import { NgCalendarModule } from 'ionic2-calendar';
// firebase
import { environment } from '../enviroment/enviroment';
import { HomePage } from '../pages/home/home';
import { LocaldataProvider } from '../providers/localdata/localdata';
import { ServicesFirebaseServiceProvider } from '../providers/services-firebase-service/services-firebase-service';
// otro
// import { CalendarModule } from 'ionic2-calendar2';
import { MyApp } from './app.component';



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    
    
    // CalendarModule
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
    LocaldataProvider,
    ServicesFirebaseServiceProvider
  ]
})
export class AppModule {}
