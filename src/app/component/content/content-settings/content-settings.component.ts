import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { DutyService } from 'src/app/service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-content-settings',
  templateUrl: './content-settings.component.html',
  styleUrl: './content-settings.component.css'
})
export class ContentSettingsComponent {

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();
  idsToEdit: number[] = [];
  userToDisplay: boolean = true;
  logedUser: User = {firstName: '', lastName: '', email: this.authService.getJwtUser()?.sub || '', active: true};
  users$ : Observable<User[]> = of([]);

  param_duty_time_start: string = '';
  param_duty_time_end: string = '';
  param_duty_time_start_shadow: string = '';
  param_duty_time_end_shadow: string = '';

  constructor(private userService: UserService,
    private authService : AuthenticationService,
    private dutyService : DutyService){}

  ngOnInit(){
    this.users$ = this.userService.getUsers();
    this.users$.subscribe(data => {
      this.logedUser = data.find(it => it.email === this.authService.getJwtUser()?.sub) || {firstName: '', lastName: '', email: this.authService.getJwtUser()?.sub || '', active: true};
    });
    this.dutyService.getDutyParams().subscribe(data => {
      this.param_duty_time_start = this.param_duty_time_start_shadow = data.hoursStart;
      this.param_duty_time_end = this.param_duty_time_end_shadow = data.hoursEnd;
    })
  }

  checkboxManagerChanged(user: User) {

  }

  checkboxAdminChanged(user: User) {
    
  }

  checkboxEnabledChanged(user: User) {
    
  }

  undoEdit(index: number){
    this.idsToEdit = this.idsToEdit.filter(v => v != index);
    if(index === 0){
      this.param_duty_time_start = this.param_duty_time_start_shadow;
      this.param_duty_time_end = this.param_duty_time_end_shadow;
    }
  }

  editMode(index: number){
    this.idsToEdit.push(index);
  }

  undoEditUser(){
    this.userToDisplay = true;
  }

  editModeUser(){
    this.userToDisplay = false;
  }

  saveDutyTimeParam(){
    if(this.param_duty_time_start?.length && this.param_duty_time_end?.length){
      this.dutyService.updateDutyParams({hoursEnd: this.param_duty_time_end, hoursStart: this.param_duty_time_start}).subscribe(_ => {
        this.param_duty_time_start_shadow = this.param_duty_time_start;
        this.param_duty_time_end_shadow = this.param_duty_time_end;
        this.undoEdit(0);
      });
    }
  }
}
