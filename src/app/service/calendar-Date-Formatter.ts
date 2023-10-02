import {CalendarDateFormatter, DateFormatterParams} from "angular-calendar";
import {formatDate} from "@angular/common";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomDateFormatterImpl {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', <string>locale);
  }

  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'MMM y', <string>locale);
  }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', <string>locale);
  }

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', <string>locale);
  }

  public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'd', <string>locale);
  }

}
