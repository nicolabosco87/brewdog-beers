import { Beer } from '../models/beer'

export interface AppState {
    loading: boolean,
    beers: Beer[],
    filters: any
}

export const INITIAL_FILTERS = {
  name: '',
  abv: {lower: 1, upper: 15},
  ibu: {lower: 1, upper: 100},
  ebc: {lower: 1, upper: 100},
}

export const INITIAL_STATE: AppState = {
    loading: true,
    beers: [],
    filters: INITIAL_FILTERS
}


