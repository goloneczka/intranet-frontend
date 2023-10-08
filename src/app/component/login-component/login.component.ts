import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {LocalStorageService} from "../../service/local-storage.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService : AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit(): void {
    const username = this.loginForm.value.username.trim();
    const password = this.loginForm.value.password;
    this.authService.login(username, password)
      .subscribe(data => {
        LocalStorageService.storeJwt(data.accessJwt);
        this.router.navigate(['/logged']);
      })
  }
}
