import {AbstractControl, FormGroup} from "@angular/forms";

export function confirmPasswordValidator(group: FormGroup) {
  if (!group.contains("password") || !group.contains("confirmPassword")) {
    return;
  }

  if (group.get("password").value !== group.get("confirmPassword").value) {
    return {"passwordsNotMatch": true};
  }
}

export function passwordPatternValidator(control: AbstractControl) {
  if (control.value === null) {
    return { "pattern": true  };
  }
  const pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#$%'&()*+,-./;:<=>?@[\\\\\\]^_`{|}~])(?=.{6,})";
  return control.value.match(pattern) ? null : { "pattern": true  };
}
