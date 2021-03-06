import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Beer } from '../../models/beer'

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  beer: Beer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beer = navParams.get('beer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
