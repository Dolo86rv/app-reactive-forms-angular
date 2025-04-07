import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
   private fb = inject(FormBuilder);
   formUtils = FormUtils;

   myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)], [this.formUtils.checkingServerControl]],
    username: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.formUtils.notOnlySpacesPattern),
      this.formUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
   }, {
    validators: [
      this.formUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword')
      ]
   })


   onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
   }

 }
