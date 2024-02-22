import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { EnvAppTag, EnvApplication, EnvApplicationOrdering } from 'src/app/model/application';
import { ApplicationService } from 'src/app/service/application.service';

@Component({
  selector: 'app-new-env-app',
  templateUrl: './new-env-app.component.html',
  styleUrl: './new-env-app.component.css'
})
export class NewEnvAppComponent {
  
  shouldComponentBeRender = false;
  applicationForm: FormGroup;
  appsShadow: EnvApplicationOrdering[] = [];

  @Output()
  addedEvent = new EventEmitter<void>();

  @Input()
  applications$ : Observable<EnvApplication[]> = of([]);

  constructor(private fb: FormBuilder,
    private applicationService: ApplicationService
 ) {
   this.applicationForm = this.fb.group({
     prodUrl: ['', [Validators.required]],
     name: ['', [Validators.required]],
     prodComment: ['', [Validators.required]],
     testUrl: ['', [Validators.required]],
     testComment: ['', [Validators.required]],
     order: ['', [Validators.required]],
     tags: ['', [Validators.required]]

   });
 }

  ngOnChanges(): void {
    this.applications$.subscribe(data => {
      this.appsShadow = data?.map(({name, orderNumber}) => ({envAppName: name, order: orderNumber}));
      this.appsShadow.forEach(it => it.order++);
      this.appsShadow.unshift({
        envAppName: 'Jako Pierwsza', order: 1
      });
    });
  }


  shouldDisplayForm(val : boolean) {
    this.shouldComponentBeRender = val;
    if(!val) {
      // this.applicationForm.reset();
    }
  }

  addApplication(){
    if(this.applicationForm.valid){
      const orderNumber: number = this.applicationForm.controls['order'].value;
      const name: string = this.applicationForm.controls['name'].value;
      const prodUrl: string = this.applicationForm.controls['prodUrl'].value;
      const testUrl: string = this.applicationForm.controls['testUrl'].value;
      const prodComment: string = this.applicationForm.controls['prodComment'].value;
      const testComment: string = this.applicationForm.controls['testComment'].value;
      const tags: string = this.applicationForm.controls['tags'].value;

      const envAppTagsDto: EnvAppTag[] = tags.length ? tags.split(';').map(tag => ({name: tag.trim()})) : [];

      this.applicationService.addEnvApp({name: name, orderNumber: orderNumber, prodUrl: prodUrl, testUrl: testUrl, prodComment: prodComment, testComment: testComment, envAppTagsDto: envAppTagsDto }).subscribe(_ => {
        this.shouldComponentBeRender = false;
        this.addedEvent.emit();
        this.applicationForm.reset();
      });
    }
  }

}
