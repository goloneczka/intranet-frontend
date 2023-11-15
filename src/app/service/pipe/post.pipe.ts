import {Pipe, PipeTransform} from "@angular/core";
import { Post } from "src/app/model/post";


@Pipe({
  name: 'PostOrder',
})
export class PostOrderPipe implements PipeTransform {
  transform(items: Post[]): any {
    return items.sort((a,b) => 
        new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime()
      );
  }
}
