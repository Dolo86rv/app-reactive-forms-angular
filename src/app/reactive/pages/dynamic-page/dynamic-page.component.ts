import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe, ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  newForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ], Validators.minLength(3)),
  });

  newFavoriteGame = new FormControl('', [Validators.required, Validators.minLength(3)]);
  //newFavoriteGame = this.fb.control([])

  get favoriteGames() {
    return this.newForm.get('favoriteGames') as FormArray;
  }

  addToFavoriteGame() {
    if( this.newFavoriteGame.invalid) return;

    const newGame = this.newFavoriteGame.value; //toma el valor de la caja de texto

    this.favoriteGames.push(
      this.fb.control(newGame, [Validators.required])
    );

    this.newFavoriteGame.reset();
  }

  removeFavoriteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    this.newForm.markAllAsTouched();
  }

 }
