import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { EnvApplication } from 'src/app/model/application';
import { ApplicationService, AuthenticationService } from 'src/app/service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { EditEnvAppComponent } from './edit-env-app/edit-env-app.component';

@Component({
  selector: 'app-enviroment',
  templateUrl: './enviroments.component.html',
  styleUrl: './enviroments.component.css'
})
export class EnviromentsComponent {

  @Input()
  envApps : EnvApplication[] = [];
  @Output()
  envAppsChanged = new EventEmitter<void>();

  touchedEnvApps: {touched: boolean, obj: EnvApplication}[] = [];
  isUserAuthenticated: boolean;

  constructor(private appService: ApplicationService, public dialog: MatDialog, private authService: AuthenticationService) {
    this.isUserAuthenticated = this.authService.hasAdminRole();
  }

  ngOnInit(): void {}

  ngOnChanges(_: SimpleChanges): void {
    this.touchedEnvApps = this.envApps.map(it => ({touched: !it.prodUrl, obj: it}));
  }

  deleteContact(envApp: EnvApplication) {
    this.appService.delete(envApp.name).subscribe(_=> {
      this.envAppsChanged.emit();
    })
  }

  touching(touch: boolean, ind: number) {
    this.touchedEnvApps[ind].touched = touch;
  }

  openDialogEdit(appToEdit: EnvApplication) {

    const envApps = this.envApps
      .filter(it => it.name !== appToEdit.name)
      .map(it => {
        it.orderNumber = it.orderNumber > appToEdit.orderNumber ? --it.orderNumber : it.orderNumber;
        return it;
      });

    const dialogRef = this.dialog.open(EditEnvAppComponent, {
      data: {envApp: appToEdit, envApps: envApps},
      minWidth: '800px',
      minHeight:'500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.envAppsChanged.emit();
      }
    });
  }

}
