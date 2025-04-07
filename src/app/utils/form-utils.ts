import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils{
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors, text: string = ''): string | null {
    for( const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} ${text}`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;
        case 'email':
            return `El valor ingresado no es un correo válido`;
        case 'emailTaken':
            return `El correo ya está en uso`;
        case 'notStrider':
            return `El usuario no puede ser Strider`;
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
            return `El valor ingresado no es un correo válido`;
          }

        return 'Error de patrón contra expresión regular';
        default:
          return 'Error desconocido';
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

  static getnamePattern(form: FormGroup, nameComplete: string): boolean | null {
    if (!form.controls[nameComplete]) {
      return null;
    }
    const regex = /^([a-zA-Z]+) ([a-zA-Z]+)$/;
    const errors = regex.test(form.controls[nameComplete].value)

    return errors;
  }

  static  isFieldOneEqualFieldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl) => {
      const field1Control = formGroup.get(field1)?.value;
      const field2Control = formGroup.get(field2)?.value;

      return field1Control === field2Control ? null : {passwordsNotEqual: true};
    }
  }

  static async checkingServerControl(control: AbstractControl): Promise<ValidationErrors | null> {
   await sleep();

   const formValue = control.value;

   if(formValue === 'hola@mundo.com'){
    return {
      emailTaken: true};
   }
   return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if(value === 'Strider'){
      return {notStrider: true};
    }
    return null;
  }

}
