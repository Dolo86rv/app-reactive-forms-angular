import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [ JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  /*myForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  })*/

    private fb = inject(FormBuilder);
    formUtils = FormUtils;

    myForm: FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)], []],   //['', Validadores sincronos, validadores asincronos]
      price: [0, [Validators.required, Validators.min(10)]],
      inStorage: [0, [Validators.required, Validators.min(0)]],
    });


   /*isValidField(fieldName: string): boolean | null {
      return (
        this.myForm.controls[fieldName].errors) &&
        (this.myForm.controls[fieldName].touched);
    }*/

    /*getFileError( filedname: string): string | null {
      const errors = this.myForm.controls[filedname].errors || {};
      if (errors['required']) {
        return 'Este campo es requerido';
      } else if (errors['minlength']) {
        return `Minimo ${errors['minlength'].requiredLength} caracteres`;
      } else if (errors['min']) {
        return `El valor minimo es ${errors['min'].min}`;
      }
      return null;
    }*/

    onSave() {
      if (this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return;
      }
      this.myForm.reset({
        name: '',
        price: 0,
        inStorage: 0,
      });
      console.log(this.myForm.value);
    }

}
