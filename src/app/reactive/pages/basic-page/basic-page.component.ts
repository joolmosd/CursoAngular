import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  
  
  constructor(private fb : FormBuilder) { }

  myForm: FormGroup = new FormGroup({
    
  /**
   En la seccion del FormControlel segundo parametro es para 
    validaciones sincronas y el tercer parámetro es para validaciones 
    asyncronas
  */
    name:  new FormControl('',[],[]),
    price:  new FormControl(0,[],[]),
    inStorage:  new FormControl(0,[],[]),
  });
  
  /**
  En la seccion del FormControlel segundo parametro es para 
  validaciones sincronas y el tercer parámetro es para validaciones 
  asyncronas
  */

  myFormBuilder = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3) ]],
    price: [0,[ Validators.required, Validators.min(0), Validators.max(10) ]],
    inStorage: [0,[ Validators.required, Validators.min(0), Validators.max(10) ]],
  })

  // *Esto me permite guardar las validaciones iniciales de formulario
  private initialValuesForm = this.myFormBuilder.value

  ngOnInit(): void {

  }

  onSave(): void {

    if(this.myFormBuilder.invalid){
      // *Marca todo los campos como tocados
      this.myFormBuilder.markAsUntouched();
      return ;
    }
    this.myFormBuilder.reset(this.initialValuesForm);
    console.log( this.myFormBuilder.value );
    
  }

  isValidField( field:string ): boolean | null {
    
    const control = this.myFormBuilder.get(field);

    if(!control){
      return null;
    }
    // * el simbolo de !! significa que el control existe y tiene errores
    return !!control.errors && control.touched;
  }


  getFieldError( field: string ): string | null {

    
    if( !this.myFormBuilder.get(field) ) return null;

    const errors = this.myFormBuilder.get(field)?.errors || {};

    for (const key of Object.keys(errors)) { 

      switch (key){
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } carácteres`

        case 'max':
          return `La cantidad Máxima es  ${ errors['max'].max } `

        case 'min':
          return `La cantidad Mínima es ${ errors['min'].requiredLength }`
        
      }
      
    }

   return null;

  }


}
