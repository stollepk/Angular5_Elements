import {Injectable} from "@angular/core";
import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<string> {

  fromModel(dateStr: string): NgbDateStruct {
    const date = new Date(dateStr);
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  toModel(date: NgbDateStruct): string {
    return date ? new Date(date.year, date.month - 1, date.day).toISOString() : null;
  }
}
