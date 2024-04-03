import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { SocialParamWithName } from 'src/app/model/param';
import { SocialMediaEventService } from 'src/app/service/event/social-media-event.service';
import { SocialMediaService } from 'src/app/service/social-media.service';

@Component({
  selector: 'app-social-media-param',
  templateUrl: './social-media-param.component.html',
  styleUrl: './social-media-param.component.css'
})
export class SocialMediaParamComponent {

  @Input()
  param : SocialParamWithName = {link: '', active: false, name: ''};
  @Output()
  changeEvent = new EventEmitter<void>();

  shadow: SocialParamWithName = {...this.param};
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private socialMediaService : SocialMediaService) {

    this.form = this.fb.group({
      link: [{value: this.shadow.link, disabled: true}, [Validators.required]],
      active: [{value: this.shadow.active, disabled: true}]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['param'] && changes['param'].currentValue) {
      this.form.patchValue(this.param);
      this.shadow = {...this.param};
    }
  }

  undoEdit(){
    this.form.reset();
    this.form.disable();
    this.form.patchValue(this.param);
  }

  editMode(){
    this.form.enable();
  }

  update(){
    const link = this.form.controls['link'].value;
    const active = this.form.controls['active'].value;
    this.socialMediaService.update({link: link, active: active, name: this.param.name}).subscribe(_ => {
      this.undoEdit();
      this.changeEvent.emit();
    })
  }

  
}
