import {Pipe, PipeTransform} from '@angular/core';
import {Document} from "../../model/document";

@Pipe({
  name: 'FilterDocument',
})
export class FilterDocumentPipe implements PipeTransform {
  transform(items: Document[], type: string): any {
    if (!items) {
      return items;
    }
    return items.filter(item => item.topic === type).sort((a,b) => 
        new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime()
      );
  }
}
