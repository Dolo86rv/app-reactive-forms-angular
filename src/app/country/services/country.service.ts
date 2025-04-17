import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  http = inject(HttpClient);
  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if(!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByCode(code: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    //TODO: Implement this
    if(!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
    /*if(!borders) return of([]);

    const urls = borders.map(code => `${this.baseUrl}/alpha/${code}?fields=cca3,name`);
    return this.http.get<Country[]>(urls);*/
  }
}