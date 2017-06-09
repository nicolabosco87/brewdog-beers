import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppState, INITIAL_STATE } from '../store/store';
import { BeerActions } from '../actions/actions';
import { RootReducer } from '../reducers/root-reducer';

import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/detail/detail';
import {AboutPage} from "../pages/about/about";
import {Subscription} from "rxjs/Subscription";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  subscription: Subscription;
  loading: boolean;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              ngRedux: NgRedux<AppState>,
              devTools: DevToolsExtension,
              private actions: BeerActions) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'About', component: AboutPage }
    ];


    ngRedux.configureStore(
        RootReducer,
        INITIAL_STATE,
        null,
        devTools.isEnabled() ? [ devTools.enhancer() ] : []);



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


        // Get beer list
        this.actions.getList();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
