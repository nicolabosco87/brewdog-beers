import { Beer } from '../models/beer'

export interface AppState {
    loading: boolean,
    beers: Beer[],
    current: Beer
}

export const INITIAL_STATE: AppState = {
    loading: true,
    beers: [
        new Beer('1','Nome', 'tagll', 'desc', 'img-url', 10, 20, 30),
        new Beer('2','Nome2', 'tagll', 'desc', 'img-url', 10, 20, 30),
    ],
    current: null
}


/*public id: string,
    public name: string,
    public tagline: string,
    public description: string,
    public image_url: string,
    public abv: number,
    public ibu: number,
    public ebc: number*/