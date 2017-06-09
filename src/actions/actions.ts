import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {AppState, INITIAL_FILTERS} from '../store/store'
import { Vibration } from '@ionic-native/vibration';

import { PunkApiProvider } from '../providers/punk-api/punk-api'
import { Beer } from '../models/beer'

@Injectable()
export class BeerActions {
    static GET_LIST = 'GET_LIST';
    static RECEIVE_LIST = 'RECEIVE_LIST';
    static GET_DETAIL = 'GET_DETAIL';
    static RECEIVE_DETAIL = 'RECEIVE_DETAIL';

    constructor(private ngRedux: NgRedux<AppState>, private punkApiProvider: PunkApiProvider, private vibration: Vibration) {}

    getList(filters: any = INITIAL_FILTERS) {
        this.ngRedux.dispatch({ type: BeerActions.GET_LIST, payload: {filters: filters} });

        this.punkApiProvider.list(filters).subscribe(
            res => {
                this.receiveList(res);
            }
        )
    }

    receiveList(beers: Beer[]) {
        this.ngRedux.dispatch({ type: BeerActions.RECEIVE_LIST, payload: {beers: beers} });
        // this.vibration.vibrate(1000);
    }
}
