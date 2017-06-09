import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, LoadingController } from 'ionic-angular';

import { NgRedux } from '@angular-redux/store';

import { BeerActions } from '../../actions/actions'
import { AppState } from '../../store/store'
import { Beer } from '../../models/beer';
import { DetailPage } from '../detail/detail'
import { ListPopoverPage } from './list-popover/list-popover'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  beers: Beer[] = [];
  loading: boolean;
  loadingAnimation;
  subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngRedux: NgRedux<AppState>,
              private actions: BeerActions, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {

    this.subscription = ngRedux.select<Beer[]>('beers')
        .subscribe(newBeers => this.beers = newBeers);



    this.subscription = ngRedux.select<boolean>('loading')
      .subscribe(loading => {
        this.loading = loading;

        if (this.loading) {
          this.loadingAnimation = this.loadingCtrl.create({
            content: "Please wait..."
          });
          this.loadingAnimation.present();
        } else {
          if(this.loadingAnimation){ this.loadingAnimation.dismiss(); this.loadingAnimation = null; }
        }

      } );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToDetail(beer) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      beer: beer
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ListPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}



