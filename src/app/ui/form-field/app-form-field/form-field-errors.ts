/** @docs-private */
export function getAppFormFieldPlaceholderConflictError(): Error {
  return Error('Placeholder attribute and child element were both specified.');
}

/** @docs-private */
export function getAppFormFieldDuplicatedHintError(): Error {
  return Error(`A hint was already declared.`);
}

/** @docs-private */
export function getAppFormFieldMissingControlError(): Error {
  return Error('mat-app-form-field must contain a AppFormFieldControl.');
}
