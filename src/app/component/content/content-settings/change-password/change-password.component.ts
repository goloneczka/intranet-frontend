import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  shouldComponentBeRender = false;
  passwordFieldType = 'password';
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
   }

  ngOnInit(): void {
    
  }


  shouldDisplayForm(arg0: boolean) {
    this.shouldComponentBeRender = arg0;
    if(!this.shouldComponentBeRender) {
      this.passwordForm.reset();
    }
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value ? { passwordsNotMatch: true } : null;
  }

  togglePasswordVisibility(): void {
    if(this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      setTimeout(() => {
        this.passwordFieldType = 'password';
      }, 4000)
    } else {
      this.passwordFieldType = 'password';
    }
  }

  save(){
    const newPassword: string = this.passwordForm.controls['newPassword'].value;
    const oldPassword: string = this.passwordForm.controls['oldPassword'].value;
    this.userService.updatePassword(oldPassword, newPassword).subscribe(_ => {});

  }
}
