import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable'

import { Beer } from '../../models/beer'

@Injectable()
export class PunkApiProvider {

  apiUrl = 'https://api.punkapi.com/v2/';


  constructor(public http: Http) {
    console.log('Hello PunkApiProvider Provider');
  }


  list(params: Object = {}) {

    let beersUrl = this.apiUrl + 'beers/?';

    Object.keys(params).map((key, index) => {
      beersUrl += key + '=' + params[key] + '&';
    });

    return this.http.get(beersUrl)
        .map(response => { return response.json() })
        .map(data => {
          let beerList = [];
          data.forEach(b => {
            beerList.push(new Beer(b.id, b.name, b.tagline, b.description, b.image_url, b.abv, b.ibu, b.ebc));
          })

          return beerList;
        });
  }


  detail(id: number) {

    let beersUrl = this.apiUrl + 'beers/' + id ;

    return this.http.get(beersUrl)
        .map(response => { return response.json() })
        .map(b => {
          b = b[0];
          return new Beer(b.id, b.name, b.tagline, b.description, b.image_url, b.abv, b.ibu, b.ebc);
        });
  }

  handleErrors(error) {
    return Observable.throw(JSON.stringify(error.json()))
  }

}
