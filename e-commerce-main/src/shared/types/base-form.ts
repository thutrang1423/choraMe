import type React from 'react';
import type {
  Control,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormSetValue,
  UseFormStateReturn
} from 'react-hook-form';

export type ExtendedControllerProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> = Omit<ControllerProps<T, TName>, 'render'> & {
  render: ({
    field,
    fieldState,
    formState
  }: {
    field: ControllerRenderProps<T, ExtendedControllerProps<T, any>['name']>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
    control?: Control<T>;
    setValue?: UseFormSetValue<T>;
    index?: number;
    name?: TName;
    mode?: ViewMode;
  }) => React.ReactElement;
};
