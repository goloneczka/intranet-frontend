import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { da } from 'date-fns/locale';
import { EnvAppTag, EnvApplication, EnvApplicationOrdering } from 'src/app/model/application';
import { ApplicationService } from 'src/app/service';

@Component({
  selector: 'app-edit-env-app',
  templateUrl: './edit-env-app.component.html',
  styleUrl: './edit-env-app.component.css'
})
export class EditEnvAppComponent {

  currentEnvAppName: string = '';
  form: FormGroup;
  envAppShadow: EnvApplication;
  envAppsShadow: EnvApplicationOrdering[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
   private fb: FormBuilder,
   public dialogRef: MatDialogRef<EditEnvAppComponent>,
   private appService: ApplicationService
  ) {
    this.envAppShadow = {...data.envApp};
    this.currentEnvAppName = this.envAppShadow.name;

    this.form = this.fb.group({
        envAppName: [this.envAppShadow.name, [Validators.required]],
        prodComment: [this.envAppShadow.prodComment],
        prodUrl: [this.envAppShadow.prodUrl],
        order: [this.envAppShadow.orderNumber, [Validators.required]],
        testComment: [this.envAppShadow.testComment],
        testUrl: [this.envAppShadow.testUrl],
        tags: [this.envAppShadow.envAppTagsDto?.map(it => it.name).join(';'), [Validators.required]]
      });

      const envApps : EnvApplication[] = data.envApps;
      this.envAppsShadow = envApps.map(({name, orderNumber}) => ({envAppName: name, order: orderNumber}));
      this.envAppsShadow.forEach(it => it.order++);
      this.envAppsShadow.unshift({
        envAppName: 'Jako Pierwsza', order: 1
      });
  }

  editContact(){
    const order: number = this.form.controls['order'].value;
    const name: string = this.form.controls['envAppName'].value;
    const prodUrl: string = this.form.controls['prodUrl'].value;
    const prodComment: string = this.form.controls['prodComment'].value;
    const testComment: string = this.form.controls['testComment'].value;
    const testUrl: string = this.form.controls['testUrl'].value;
    const tags: string = this.form.controls['tags'].value;

    const envAppTagsDto: EnvAppTag[] = tags.length ? tags.split(';').map(tag => ({name: tag.trim()})) : [];

    this.appService.edit({orderNumber: order, name: name, testUrl: testUrl, testComment: testComment, prodUrl: prodUrl, prodComment: prodComment, envAppTagsDto: envAppTagsDto}, this.currentEnvAppName).subscribe(_ => {
      this.dialogRef.close(true);
    });
  }

}
