import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  shouldComponentBeRender = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: [false, null],
      isManager: [false, null]
    });
   }

  shouldDisplayForm(arg0: boolean) {
    this.shouldComponentBeRender = arg0;
    if(!this.shouldComponentBeRender){
      this.form.reset();
    }
  }

  save(){
    const firstName: string = this.form.controls['firstName'].value;
    const lastName: string = this.form.controls['lastName'].value;
    const email: string = this.form.controls['email'].value;
    const isAdmin: boolean = this.form.controls['isAdmin'].value;
    const isManager: boolean = this.form.controls['isManager'].value;

    this.userService.createUser({firstName: firstName, lastName: lastName, email: email, admin: isAdmin, manager: isManager}).subscribe(_ => {
      this.form.reset();
      this.shouldComponentBeRender = false;
    });
  }

}
