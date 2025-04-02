import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils{

  static getTextError(errors: ValidationErrors, text: string = ''): string | null {
    for( const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} ${text}`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors) &&
      (form.controls[fieldName].touched);
  }

  static getFileError(form: FormGroup, fieldname: string): string | null {
    if (!form.controls[fieldname]) {
      return null;
    }
    const errors = form.controls[fieldname].errors ?? {};

    return FormUtils.getTextError(errors, "caracteres");
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors &&
      formArray.controls[index].touched
    )
  }

  static getFileErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors, "juegos");
  }

}
