import { Component, ViewChild } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { DutyService } from 'src/app/service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SocialMediaService } from 'src/app/service/social-media.service';
import { SocialParamWithName } from 'src/app/model/param';
import { DutyToAccept } from 'src/app/model/duty';
import { SocialMediaEventService } from 'src/app/service/event/social-media-event.service';



@Component({
  selector: 'app-content-settings',
  templateUrl: './content-settings.component.html',
  styleUrl: './content-settings.component.css'
})
export class ContentSettingsComponent {

  @ViewChild(ChangePasswordComponent)
  changePasswordComponent!: ChangePasswordComponent;
  @ViewChild(NewUserComponent)
  newUserComponent!: NewUserComponent;

  subscription!: Subscription;

  isUserAuthenticated: boolean;
  userToDisplay: boolean = true;
  logedUser: User;
  users$ : Observable<User[]> = of([]);

  is_param_duty_time_edditing = false;
  param_duty_time_start: string = '';
  param_duty_time_end: string = '';
  param_duty_time_start_shadow: string = '';
  param_duty_time_end_shadow: string = '';

  socialMediaTwitter: SocialParamWithName | null = {link: '', active: false, name: ''};
  socialMediaFacebook: SocialParamWithName | null = {link: '', active: false, name: ''};
  socialMediaYoutube: SocialParamWithName | null = {link: '', active: false, name: ''};
  socialMediaInstagram: SocialParamWithName | null = {link: '', active: false, name: ''};
  socialMediaLinkedin: SocialParamWithName | null = {link: '', active: false, name: ''};

  constructor(private userService: UserService,
    private authService : AuthenticationService,
    private dutyService : DutyService,
    private socialMediaService : SocialMediaService,
    private socialMediaEventService: SocialMediaEventService){
      this.isUserAuthenticated = this.authService.hasAdminRole();
      this.logedUser = this.getBasicUser();
    }

  ngOnInit(){
    this.users$ = this.userService.getUsers();
    this.users$.subscribe(data => {
      this.logedUser = data.find(it => it.email === this.authService.getJwtUser()?.sub) || this.getBasicUser();
    });

    this.dutyService.getDutyParams().subscribe(data => {
      this.param_duty_time_start = this.param_duty_time_start_shadow = data.hoursStart;
      this.param_duty_time_end = this.param_duty_time_end_shadow = data.hoursEnd;
    });

    this.socialMediaService.getAll().subscribe(data => {
      this.socialMediaLinkedin = data.find(it => it.name === 'LINKEDIN') || null;
      this.socialMediaTwitter = data.find(it => it.name === 'TWITTER') || null;
      this.socialMediaFacebook = data.find(it => it.name === 'FACEBOOK') || null;
      this.socialMediaYoutube = data.find(it => it.name === 'YOUTUBE') || null;
      this.socialMediaInstagram = data.find(it => it.name === 'INSTAGRAM') || null;
    });
  }

  private getBasicUser(): User {
    return {firstName: '', lastName: '', email: this.authService.getJwtUser()?.sub || '', active: true, manager: false, admin: false};
  }

  openNewUser(){
    this.newUserComponent.shouldDisplayForm(true);
  }

  openChangePassword() {
    this.changePasswordComponent.shouldDisplayForm(true);
  }


  checkboxManagerChanged(user: User) {

  }

  checkboxAdminChanged(user: User) {
    
  }

  checkboxEnabledChanged(user: User) {
    
  }

  undoEditDutyParam(){
    this.is_param_duty_time_edditing = false;
    this.param_duty_time_start = this.param_duty_time_start_shadow;
    this.param_duty_time_end = this.param_duty_time_end_shadow;
  }

  editModeDutyParam(){
    this.is_param_duty_time_edditing = true;
  }

  saveDutyTimeParam(){
    if(this.param_duty_time_start?.length && this.param_duty_time_end?.length){
      this.dutyService.updateDutyParams({hoursEnd: this.param_duty_time_end, hoursStart: this.param_duty_time_start}).subscribe(_ => {
        this.param_duty_time_start_shadow = this.param_duty_time_start;
        this.param_duty_time_end_shadow = this.param_duty_time_end;
        this.undoEditDutyParam();
      });
    }
  }

  undoEditUser(){
    this.userToDisplay = true;
  }

  editModeUser(){
    this.userToDisplay = false;
  }

  onChangeSocialParamEvent() {
    this.socialMediaEventService.sendMessageSocialMediaEdited();
    this.socialMediaService.getAll().subscribe(data => {
      this.socialMediaLinkedin = data.find(it => it.name === 'LINKEDIN') || null;
      this.socialMediaTwitter = data.find(it => it.name === 'TWITTER') || null;
      this.socialMediaFacebook = data.find(it => it.name === 'FACEBOOK') || null;
      this.socialMediaYoutube = data.find(it => it.name === 'YOUTUBE') || null;
      this.socialMediaInstagram = data.find(it => it.name === 'INSTAGRAM') || null;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
