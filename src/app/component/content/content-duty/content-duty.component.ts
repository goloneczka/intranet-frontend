import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Duty, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { EditEmployeeTeamDialogComponent } from '../content-employee/edit-employee-team-dialog/edit-employee-team-dialog.component';
import { NewDutyDialogComponent } from './new-duty-dialog/new-duty-dialog.component';

@Component({
  selector: 'app-content-duty',
  templateUrl: './content-duty.component.html',
  styleUrls: ['./content-duty.component.css']
})
export class ContentDutyComponent {

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

  duties: Duty[] = [];
  dailyDuties: Duty[] = [];

  dutyTypes: DutyType[] = [];

  filterForm: FormGroup;

  constructor(private dutyService: DutyService, private fb: FormBuilder, public dialog: MatDialog) {
    this.filterForm = this.fb.group({
      date: [''],
      dutyType: ['']
    });
  }

  ngOnInit(): void {
    this.dutyService.getDutyTypes().subscribe(typesData => {
      this.dutyTypes = typesData;
      this.prepareDutiesForMonth(new Date());
      this.prepareDutyForDay(new Date());
    });
  }

  prepareDutiesForMonth(date : Date) {
    this.dutyService.getDutiesForMonth(date).subscribe(dutyData => {
      this.duties = dutyData;
    });
  }

  prepareDutyForDay(date : Date) { 
    this.dutyService.getDuties(date).subscribe(dutyData => {
      this.dailyDuties = dutyData;
    });
  }

  prepareNewDutyDialog(newDutyFields: { resource: string; day: string, date: Date }) {
    const dialogRef = this.dialog.open(NewDutyDialogComponent, {
      data: {'dutyType': newDutyFields.resource, 'dutyDay': newDutyFields.date},
      minWidth: '800px',
      minHeight:'500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          console.log('huehue ', result);
          this.dutyService.createNewDuty(result).subscribe(_ => {
            this.prepareDutiesForMonth(result.dutyDay);
            this.prepareDutyForDay(result.dutyDay);
          });
      }
    });
  }
}
