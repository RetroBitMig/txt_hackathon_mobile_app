import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormPage } from '../pages/form/form';
import { PetitionPage } from '../pages/petition/petition';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { ShowAppsPage } from '../pages/show-apps/show-apps';
import { DetailedAppPage } from '../pages/detailed-app/detailed-app';
import { ApplicationModalPage } from '../pages/application-modal/application-modal';
import { NativeStorage } from '@ionic-native/native-storage';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormPage,
    ShowAppsPage,
    DetailedAppPage,
    ApplicationModalPage,
    PetitionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
    ShowAppsPage,
    DetailedAppPage,
    ApplicationModalPage,
    PetitionPage
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
