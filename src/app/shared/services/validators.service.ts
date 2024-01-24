import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  cantBeStrider = ( control: FormControl ): ValidationErrors | null =>{

    const value:string  = control.value.trim().toLowerCase();

    if(value === 'strider') {

        return {
            noStider: true,
        }
    }

    return null;
  }

  isValidField( form: FormGroup, field:string ){

    const control = form.get(field);

    if(!control){
      return null;
    }
    // * el simbolo de !! significa que el control existe y tiene errores
    return !!control.errors && control.touched;
  }

  isFieldOneEqualFieldTwo( field1:string, field2:string ) {

    /**
     * Esta funcion se usa para evaluar el formGroup
     */
    return ( formGroup: AbstractControl): ValidationErrors | null =>{
      const fieldValueOne = formGroup.get(field1)?.value
      const fieldValueTwo = formGroup.get(field2)?.value

      if(fieldValueOne !== fieldValueTwo){
        
        formGroup.get(field2)?.setErrors({notEqualPassword:true})
        // *Se le retorna el error de notEqual, este mensaje u objeto puede ser al gusto de uno
        return {notEqual:true}

      };

      // *Se le retorna null, haciendo referencia a que no hay ningun error
      formGroup.get(field2)?.setErrors(null)

      return null;
    }
  }

}
