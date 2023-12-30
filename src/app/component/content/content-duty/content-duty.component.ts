import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Duty, DutyToAccept, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NewDutyDialogComponent } from './new-duty-dialog/new-duty-dialog.component';
import { DutyAcceptanceComponent } from './duty-acceptance/duty-acceptance.component';
import { NewDutyTypeComponent } from './new-duty-type/new-duty-type.component';
import { DutyEventService } from 'src/app/service/duty-event.service';

@Component({
  selector: 'app-content-duty',
  templateUrl: './content-duty.component.html',
  styleUrls: ['./content-duty.component.css']
})
export class ContentDutyComponent {

  @ViewChild(DutyAcceptanceComponent)
  dutyAcceptanceComponent!: DutyAcceptanceComponent;

  @ViewChild(NewDutyTypeComponent)
  newDutyTypeComponent!: NewDutyTypeComponent;

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

  pickedDay: Date = new Date();
  dutiesToAccept: Duty[] = [];

  dutyTypes: DutyType[] = [];


  constructor(private dutyService: DutyService, private fb: FormBuilder, public dialog: MatDialog, private dutyEventService: DutyEventService) {}

  ngOnInit(): void {
    this.dutyService.getDutyTypes().subscribe(typesData => {
      this.dutyTypes = typesData;
      this.prepareDutyForDay(new Date());
      this.prepareDutiesToAccept();
    });
  }


  prepareDutiesToAccept() {
    this.dutyService.getDutiesToAccept().subscribe(dutyData => {
      this.dutiesToAccept = dutyData;
    });
  }

  prepareDutyForDay(date : Date) { 
    this.pickedDay = date;
  }

  prepareNewDutyDialog(newDutyFields: { resource: string; day: string, date: Date }) {
    const dialogRef = this.dialog.open(NewDutyDialogComponent, {
      data: {'dutyType': newDutyFields.resource, 'dutyDay': newDutyFields.date},
      minWidth: '800px',
      minHeight:'400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          this.dutyService.createNewDuty(result).subscribe(_ => {
            this.dutyEventService.sendMessageDutyIsResolved({dutyDay: result.dutyDay, acceptance: false} as DutyToAccept);
            this.prepareDutiesToAccept();
          });
      }
    });
  }

  acceptDuties() {
    this.prepareDutiesToAccept();
    this.dutyAcceptanceComponent.shouldDisplayForm(true);
  }

  addDutyType() {
    this.newDutyTypeComponent.shouldDisplayForm(true);
  }

  saveNewDutyType(newDutyType: DutyType) {
    this.dutyService.createDutyType(newDutyType).subscribe(_ => {
        this.dutyService.getDutyTypes().subscribe(typesData => {
          this.dutyTypes = typesData;
        });
    });
  }

  saveNewDutyAcceptance(newDutyAcceptance: DutyToAccept) {
    this.dutyService.createDutyAcceptance(newDutyAcceptance).subscribe(_ => {

      this.prepareDutiesToAccept();
      this.dutyEventService.sendMessageDutyIsResolved(newDutyAcceptance);
    });
  }
}
