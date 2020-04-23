import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-order-class-selector",
  templateUrl: "./order-class-selector.component.html",
  styleUrls: ["./order-class-selector.component.scss"],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => OrderClassSelectorComponent), multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderClassSelectorComponent implements OnInit, ControlValueAccessor {
  private _value = 1;
  disabled = false;

  options = [
    {value: 1, name: "Market"},
    {value: 2, name: "Limit"}
  ];

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  get value() {
    return this._value;
  }

  set value(newVal) {
    this._value = newVal;
    this.onChange(newVal);
  }

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
