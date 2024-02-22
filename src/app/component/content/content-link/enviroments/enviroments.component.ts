import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { EnvApplication } from 'src/app/model/application';
import { ApplicationService } from 'src/app/service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-enviroment',
  templateUrl: './enviroments.component.html',
  styleUrl: './enviroments.component.css'
})
export class EnviromentsComponent {

  @Input()
  envApps$ : Observable<EnvApplication[]> = of([]);
  @Output()
  envAppsChanged = new EventEmitter<void>();

  touchedEnvApps: {touched: boolean, obj: EnvApplication}[] = [];
  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

  constructor(private appService: ApplicationService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(_: SimpleChanges): void {
    this.envApps$.subscribe(data => {
      this.touchedEnvApps = data.map(it => ({touched: !it.prodUrl, obj: it}));
    })
  }

  deleteContact(envApp: EnvApplication) {
    this.appService.delete(envApp.name).subscribe(_=> {
      this.envAppsChanged.emit();
    })
  }

  touching(touch: boolean, ind: number) {
    this.touchedEnvApps[ind].touched = touch;
  }

}
