import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  shouldComponentBeRender = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: [null],
      isManager: [null]
    });
   }

  shouldDisplayForm(arg0: boolean) {
    this.shouldComponentBeRender = arg0;
    if(!this.shouldComponentBeRender){
      this.form.reset();
    }
  }

  save(){
    
  }

}
