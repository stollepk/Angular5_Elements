import {Pipe, PipeTransform} from "@angular/core";
import {KeyValueModel} from "../../../shared/models/key-value-model";

@Pipe({ name: "enumKeys" })
export class EnumKeysPipe implements PipeTransform {
  transform(value: any): KeyValueModel[] {
    const keys: KeyValueModel[] = [];
    for (const enumMember in value) {
      const isValueProperty = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) {
        keys.push({ key: parseInt(enumMember, 10), value: value[enumMember] });
      }
    }
    return keys;
  }
}
