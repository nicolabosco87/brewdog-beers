import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import {BeerActions} from "../../../actions/actions";
import {Beer} from "../../../models/beer";
import {AppState} from "../../../store/store";
import {NgRedux} from "@angular-redux/store";


@Component({
    template: `
    <ion-list>
      <ion-list-header>Filters</ion-list-header>

        <ion-item>
            <ion-label fixed>Beer name</ion-label>
            <ion-input [(ngModel)]="filters.name" type="text" ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>ABV <ion-badge>{{filters.abv.lower}} - {{filters.abv.upper}}</ion-badge></ion-label>
          <ion-range dualKnobs="true" [(ngModel)]="filters.abv" min="1" max="15" snaps="true"></ion-range>
        </ion-item>

        <ion-item>
          <ion-label>IBU <ion-badge>{{filters.ibu.lower}} - {{filters.ibu.upper}}</ion-badge></ion-label>
          <ion-range dualKnobs="true" [(ngModel)]="filters.ibu" min="1" max="100" snaps="true"></ion-range>
        </ion-item>

        <ion-item>
          <ion-label>EBC <ion-badge>{{filters.ebc.lower}} - {{filters.ebc.upper}}</ion-badge></ion-label>
          <ion-range dualKnobs="true" [(ngModel)]="filters.ebc" min="1" max="100" snaps="true"></ion-range>
        </ion-item>

      <button ion-item (click)="close()">Apply filters</button>
    </ion-list>
  `
})
export class ListPopoverPage {
  filters: any;
  subscription: any;
  name: string;
    constructor(public viewCtrl: ViewController, private beerActions: BeerActions, private ngRedux: NgRedux<AppState>) {

      this.subscription = ngRedux.select('filters')
        .subscribe(newFilters => this.filters = newFilters );
    }

    close() {

        this.beerActions.getList({
          name: this.filters.name,
          abv: this.filters.abv,
          ibu: this.filters.ibu,
          ebc: this.filters.ebc,
        });

        this.viewCtrl.dismiss();
    }
}
