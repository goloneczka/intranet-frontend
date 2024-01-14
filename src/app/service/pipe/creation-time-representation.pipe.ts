import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'creationTimeRepresentation',
})
export class CreationTimeRepresentationPipe implements PipeTransform {

  transform(creationTime: Date): string {
    if (creationTime) {
        const seconds = Math.floor((+new Date() - +new Date(creationTime)) / 1000);
        if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
            return 'Teraz';
        const intervals: { [key: string]: number } = {
            'lat': 31536000,
            'mies.': 2592000,
            'tyg.': 604800,
            'dni': 86400,
            'g.': 3600,
            'm.': 60,
            's.': 1
        };
        let counter;
        for (const i in intervals) {
            counter = Math.floor(seconds / intervals[i]);
            if (counter > 0){
                return counter + ' ' + i + ' temu'; 
            }
        }
    }
    return creationTime.toDateString();
  }

}
