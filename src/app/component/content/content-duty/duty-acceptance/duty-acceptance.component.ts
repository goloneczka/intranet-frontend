import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Duty, DutyToAccept } from 'src/app/model/duty';

@Component({
  selector: 'app-duty-acceptance',
  templateUrl: './duty-acceptance.component.html',
  styleUrl: './duty-acceptance.component.css'
})
export class DutyAcceptanceComponent {

  shouldComponentBeRender : boolean = false;

  @Input()
  duties: Duty[] = [];

  dutiesAcceptance: DutyToAccept[] = [];

  @Output()
  newDutyAcceptanceEvent = new EventEmitter<DutyToAccept>();

  ngOnInit() {
    this.dutiesAcceptance = this.duties.map(it => { return {...it, acceptance: false}});
  }

  ngOnChanges(_: SimpleChanges): void {
    this.dutiesAcceptance = this.duties.map(it => { return {...it, acceptance: false}});
  }


  shouldDisplayForm(val : boolean) {
    this.shouldComponentBeRender = val; 
  }

  updateAcceptanceDuty(accepted : boolean, duty : DutyToAccept){
    duty.acceptance = accepted;
  }

  saveAcceptanceDuty(duty : DutyToAccept){
    this.newDutyAcceptanceEvent.emit(duty);
  }
}
