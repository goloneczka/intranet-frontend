import {Pipe, PipeTransform, SecurityContext} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'SafeHtml',
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): any {
    if(!value){
      return value;
    }
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
