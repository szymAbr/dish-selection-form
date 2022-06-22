import { ReactNode } from "react";
import { Field } from "react-final-form";

interface ConditionTypes {
  when: string;
  is: string;
  children: ReactNode;
}

export default function Condition({ when, is, children }: ConditionTypes) {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
}
