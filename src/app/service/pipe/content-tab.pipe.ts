import {Pipe, PipeTransform} from "@angular/core";
import {contentTab, contextTabRender} from "../../model/content-tab";


@Pipe({
  name: 'ContentTabDisplay',
})
export class ContentTabDisplayPipe implements PipeTransform {
  transform(item: contentTab): string {
    return item ? contextTabRender.get(item) || '' : '';
  }
}
