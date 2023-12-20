import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Duty, DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

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

  constructor(private dutyService: DutyService, private fb: FormBuilder) {
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
}
