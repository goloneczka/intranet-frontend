import { PipeTransform, Pipe } from '@angular/core';
import {Duty} from "../model/duty";

@Pipe({
  name: 'filterDuty',
})
export class FilterDutyPipe implements PipeTransform {
  transform(items: Duty[], type: string): any {
    if (!items || !type) {
      return items;
    }
    return items.filter(item => item.dutyType === type);
  }
}
