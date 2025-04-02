import { FormGroup } from '@angular/forms';
export class FormUtils{

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors) &&
      (form.controls[fieldName].touched);
  }

  static getFileError(form: FormGroup, filedname: string): string | null {
    if (!form.controls[filedname]) {
      return null;
    }
    const errors = form.controls[filedname].errors ?? {};

    for( const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;
      }
    }
    return null;
  }

}
