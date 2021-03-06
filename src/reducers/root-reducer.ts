//import { Action } from 'redux';
import { AppState } from '../store/store';
import { BeerActions } from '../actions/actions';

export function RootReducer(state: AppState, action: any): AppState {

    switch (action.type) {

        case BeerActions.GET_LIST:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                filters: action.payload.filters
            });
        case BeerActions.RECEIVE_LIST :
            return Object.assign({}, state, {
                ...state,
                loading: false,
                beers: action.payload.beers
            });

        default: return state;
    }
}
