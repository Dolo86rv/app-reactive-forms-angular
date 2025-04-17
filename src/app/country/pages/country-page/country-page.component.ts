import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);

  countryService = inject(CountryService);
  regions = signal(this.countryService.regions);

  countriesByRegions = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myform = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect(( onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
      onCleanUp(() => {
        regionSubscription.unsubscribe();
        countrySubscription.unsubscribe();
      });
  });

  onRegionChanged() {
    return this.myform
      .get('region')!
      .valueChanges
      .pipe(
        tap(() => this.myform.get('country')!.setValue('')),
        tap(() => this.myform.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegions.set([]);
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region ?? ''))
      )
      .subscribe((countries) => {
        this.countriesByRegions.set(countries);
      });
  };

  onCountryChanged() {
    return this.myform
      .get('country')!
      .valueChanges
      .pipe(
        tap(() => this.myform.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByCode(alphaCode ?? '')),
        switchMap( (country) => this.countryService.getCountryNamesByCodeArray( country.borders))
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  };

  onSubmit() {
    console.log(this.myform.value);
    this.myform.markAllAsTouched();
  }

}
