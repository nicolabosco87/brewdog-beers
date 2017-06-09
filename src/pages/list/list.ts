import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NgRedux } from '@angular-redux/store';

import { BeerActions } from '../../actions/actions'
import { AppState } from '../../store/store'
import { Beer } from '../../models/beer';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  beers: Beer[] = [];
  subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngRedux: NgRedux<AppState>,
              private actions: BeerActions) {

    this.subscription = ngRedux.select<Beer[]>('beers')
        .subscribe(newBeers => this.beers = newBeers);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }*/
}
