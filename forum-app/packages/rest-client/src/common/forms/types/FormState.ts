import { FormFields } from '@shared/types';
import { FieldValidator, FormValidator } from '@shared/validation';

export interface FormState<TFields extends FormFields> {
  values: TFields;
  errors: {
    [FieldName in keyof TFields | 'form']?: string;
  };
  touched: {
    [FieldName in keyof TFields | 'form']?: boolean;
  };
  dirty: {
    [FieldName in keyof TFields | 'form']?: boolean;
  };
  validationSchema?: {
    [FieldName in keyof TFields]?: Array<FieldValidator<TFields[FieldName]>>;
  } & {
    form?: Array<FormValidator<TFields>>;
  };
}
