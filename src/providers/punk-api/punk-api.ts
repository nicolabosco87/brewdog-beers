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


  list(params: any = {}) {

    let beersUrl = this.apiUrl + 'beers/?';

    /*Object.keys(params).map((key, index) => {
      beersUrl += key + '=' + params[key] + '&';
    });*/


    if (params.name != undefined && params.name != '') {
      beersUrl+= 'beer_name='+params.name+'&';
    }

    if (params.abv != undefined && params.abv.lower != undefined && params.abv.upper != undefined ) {
      beersUrl+= 'abv_gt='+params.abv.lower+'&';
      beersUrl+= 'abv_lt='+params.abv.upper+'&';
    }

    if (params.ibu != undefined && params.ibu.lower != undefined && params.ibu.upper != undefined ) {
      beersUrl+= 'ibu_gt='+params.ibu.lower+'&';
      beersUrl+= 'ibu_lt='+params.ibu.upper+'&';
    }

    if (params.ebc != undefined && params.ebc.lower != undefined && params.ebc.upper != undefined ) {
      beersUrl+= 'ebc_gt='+params.ebc.lower+'&';
      beersUrl+= 'ebc_lt='+params.ebc.upper+'&';
    }

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
