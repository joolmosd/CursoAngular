import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

/**
 * Este es un servicio que se usa para generar
 * una validación asincrona para los fomularios, 
 * en este caso se usa para la validacion del campo
 * email
 */
export class EmailValidatorService implements AsyncValidator {

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        
        const email = control.value
        // *Es una forma de crear un Observable

        /**
         * El subscriber es la persona que esta suscrita al observable en español,
         * seria como el suscriptor del observable
         */

        // //const httpCallObservable = new Observable <ValidationErrors | null> ( (subscriber) => {

        // //} )
        
        // //return httpCallObservable

        // *Esta es la segunda forma de crear un Observable
        return new Observable <ValidationErrors | null> ( (subscriber) => {

            if(email === 'prueba@gmail.com'){
                //* El complete lo que hace es decir que ya se culmino el subscriber 
                //* y no se van a emitir mas valores
                subscriber.next({emailTaken: true});
                subscriber.complete();
            }

            subscriber.next(null);
            subscriber.complete();
            
        
        })
    
    }
}

