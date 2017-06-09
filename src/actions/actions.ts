import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/store'

import { PunkApiProvider } from '../providers/punk-api/punk-api'
import { Beer } from '../models/beer'

@Injectable()
export class BeerActions {
    static GET_LIST = 'GET_LIST';
    static RECEIVE_LIST = 'RECEIVE_LIST';
    static GET_DETAIL = 'GET_DETAIL';
    static RECEIVE_DETAIL = 'RECEIVE_DETAIL';

    constructor(private ngRedux: NgRedux<AppState>, private punkApiProvider: PunkApiProvider) {}

    getList() {
        this.ngRedux.dispatch({ type: BeerActions.GET_LIST });

        this.punkApiProvider.list().subscribe(
            res => {
                this.receiveList(res);
            }
        )
    }

    receiveList(beers: Beer[]) {
        this.ngRedux.dispatch({ type: BeerActions.RECEIVE_LIST, payload: {beers: beers} });
    }
}