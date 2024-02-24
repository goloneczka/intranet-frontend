import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnvApplication, EnvApplicationOrdering } from 'src/app/model/application';
import { ApplicationService } from 'src/app/service';

@Component({
  selector: 'app-sorting-env-app',
  templateUrl: './sorting-env-app.component.html',
  styleUrl: './sorting-env-app.component.css'
})
export class SortingEnvAppComponent {
  
  @Input()
  applications : EnvApplication[] = [];
  @Output()
  applicationsChanged = new EventEmitter<void>();
  
  applicationsShadow: EnvApplicationOrdering[] = [];
  shouldComponentBeRender = false;

  constructor(private applicationService: ApplicationService) {}
  
  ngOnChanges(): void {
      this.applicationsShadow = this.applications?.map(({name, orderNumber}) => ({envAppName: name, order: orderNumber}));
  }

  shouldDisplayForm(val : boolean) {
    if(!val) {
        this.applicationsShadow = this.applications?.map(({name, orderNumber}) => ({envAppName: name, order: orderNumber}));
    }
    this.shouldComponentBeRender = val;
  }

  onDrop(event: CdkDragDrop<EnvApplicationOrdering[]>) {
    moveItemInArray(this.applicationsShadow, event.previousIndex, event.currentIndex);
  }

  saveOrder() {
    const applicationsToUpdate :EnvApplicationOrdering[] = this.applicationsShadow.map((it, ind) => {
        if(it.order === ind+1) {
          return null!;
        }
        it.order = ind +1;
        return it;
    }).filter(it => it !== null);

    if(applicationsToUpdate.length){{
      this.applicationService.updateEnvAppsOrder(applicationsToUpdate).subscribe(_ => {});    
      this.applicationsChanged.emit();
      this.shouldDisplayForm(false);
    }}
  }
}
