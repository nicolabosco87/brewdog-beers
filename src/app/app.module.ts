import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { NgReduxModule } from '@angular-redux/store';

import { BeerActions } from '../actions/actions'

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/detail/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PunkApiProvider } from '../providers/punk-api/punk-api';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PunkApiProvider,
    BeerActions
  ]
})
export class AppModule {}
