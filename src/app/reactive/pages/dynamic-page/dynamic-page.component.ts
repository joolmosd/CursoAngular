import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({

    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      // ['Camilo Olmos', Validators.required],
      // ['Joan Duran', Validators.required]
    ])
  })

  public newFavorite: FormControl = new FormControl ('', Validators.required)

  constructor(private fb : FormBuilder) { }


  ngOnInit(): void {
  }

  isValidField( field:string ): boolean | null {
    
    const control = this.myForm.get(field);

    if(!control){
      return null;
    }
    // * el simbolo de !! significa que el control existe y tiene errores
    return !!control.errors && control.touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number) {
    return formArray.controls[index].errors 
    &&     formArray.controls[index].touched
  }


  getFieldError( field: string ): string | null {

    
    if( !this.myForm.get(field) ) return null;

    const errors = this.myForm.get(field)?.errors || {};

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
  

  getFieldErrorInArray( formArray: FormArray, index: number ): string | null {

    const control =   formArray.controls[ index ];

    if( !control ) return null;

    const errors = control.errors || {};

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

  onAddFavoriteGame( ):void {

    if (this.newFavorite.invalid) return;
    const newItem = this.newFavorite.value;

    this.favoriteGames.push( 
      this.fb.control(newItem)
     );

    this.newFavorite.reset()
  }

  onDeleteFavoriteGame( index:number ):void{

    this.favoriteGames.removeAt( index)
  }
  

  onSubmit() {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
    }

    console.log( this.myForm.value );
    this.myForm.reset();
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    
  }


  get favoriteGames(): FormArray{

    return this.myForm.get('favoriteGames') as FormArray;

  }



}
