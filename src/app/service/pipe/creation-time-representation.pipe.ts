import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'creationTimeRepresentation',
})
export class CreationTimeRepresentationPipe implements PipeTransform {

  transform(creationTime: Date): string {
    const timeDifference = Math.floor((new Date().getTime() - new Date(creationTime).getTime()) / 60000); // Convert milliseconds to min.utes
    switch (true) {
        case timeDifference < 1:
            return 'teraz';
        case timeDifference < 2:
            return '1 min. temu';
        case timeDifference < 3:
            return '2 min. temu';
        case timeDifference < 5:
            return `${timeDifference} min. temu`;
        case timeDifference < 10:
            return '5 min. temu';
        case timeDifference < 15:
            return '10 min. temu';
        case timeDifference < 20:
            return '15 min. temu';
        case timeDifference < 30:
            return '20 min. temu';
        case timeDifference < 60:
            return '30 min. temu';
        case timeDifference < 120:
            return '1h. temu';
        case timeDifference < 180:
            return '2h. temu';
        case timeDifference < 360:
            return '3h. temu';
        case timeDifference < 720:
            return '6h. temu';
        case timeDifference < 1440:
            return '12h. temu';
        case timeDifference < 2880:
            return '1d. temu';
        case timeDifference < 4320:
            return '2d. temu';
        case timeDifference < 10080:
            return `${Math.floor(timeDifference / 1440)}d. temu`; // days
        case timeDifference < 20160:
            return '1t. temu';
        case timeDifference < 30240:
            return '2t. temu';
        case timeDifference < 40320:
            return '3t. temu';
        case timeDifference < 50400:
            return '4t. temu';
        case timeDifference < 60480:
            return `${Math.floor(timeDifference / 10080)}t. temu`; // weeks
        case timeDifference < 131400:
            return '1mies. temu';
        case timeDifference < 262800:
            return '2mies. temu';
        case timeDifference < 394200:
            return '3mies. temu';
        case timeDifference < 525600:
            return `${Math.floor(timeDifference / 43800)}mies. temu`; // months
        default:
            return 'ponad roku temu';
    }
  }

}
