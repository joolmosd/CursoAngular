import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm : FormGroup = this.fb.group({
    gender: ['', [Validators.required]],
    wantNotifications: [ false, [Validators.required]],
    termsAndConditions: [ false, [Validators.requiredTrue]],
  })

  public person = {
    gender: 'F',
    wantNotification: false
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  isValidField( field:string ): boolean | null {
    const control = this.myForm.get(field)
    if(!control) {
      return null;
    }

    return !!control.errors && control.touched
  }

  onSave(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
    


  }

}
