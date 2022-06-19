import { Field } from "react-final-form";
import { TextFieldElement } from "./styles/TextFieldElement.styled";

interface FormFieldNumberProps {
  formData: any;
  options: string[];
}

export default function FormFieldNumber({
  formData,
  options,
}: FormFieldNumberProps) {
  return (
    <>
      {options.map((option) => (
        <Field key={option} name={option}>
          {({ input, meta }) => (
            <div>
              <TextFieldElement {...input} type="number" label={option} />

              <br />

              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
      ))}
    </>
  );
}
