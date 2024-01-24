import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from 'src/app/shared/validators/validators';

import { EmailValidatorService } from 'src/app/shared/services/email-validator.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [new EmailValidatorService()]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [this.emailValidatorService] ],
    userName: ['', [ Validators.required, customValidators.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  constructor( 
      private fb: FormBuilder,
      private validatorService: ValidatorsService,
      private emailValidatorService: EmailValidatorService
    ) { }

  ngOnInit(): void {
  }

  isValidField( field:string ) {
    return this.validatorService.isValidField(this.myForm, field)
  }

  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    
  }

}
