import { Form, Field } from "react-final-form";
import axios from "axios";

import FormCondition from "./FormCondition";
import FormButtons from "./FormButtons";
import { FormBox } from "./styles/FormBox.styled";
import { FormPaper } from "./styles/FormPaper.styled";
import { FormLabelElement } from "./styles/FormLabelElement.styled";
import { TextFieldElement } from "./styles/TextFieldElement.styled";
import { Select } from "./styles/Select.styled";
import { FormError } from "./styles/FormError.styled";

type Validator = (value: string) => string;

// return value type set to "any" to bypass the type
// expected by Field's property "parse"
const parse = (value: string): any =>
  isNaN(parseInt(value)) ? "" : parseInt(value);
const parseDiameter = (value: string): any =>
  isNaN(parseFloat(value)) ? "" : parseFloat(value);
const required = (value: string) =>
  !value || value === "default" ? "Required" : "";
const timeFormat = (value: string) =>
  value[2] === ":" &&
  value[5] === ":" &&
  value.length === 8 &&
  value.split(":").every((str) => !isNaN(parseInt(str)))
    ? ""
    : "Incorrect format";
const pizzaSlices = (value: string) =>
  parseInt(value) >= 1 && parseInt(value) <= 16 ? "" : "Wrong quantity";
const pizzaDiameter = (value: string) =>
  parseFloat(value) >= 15 && parseFloat(value) <= 60 ? "" : "Wrong diameter";
const soupSandwichNumber = (value: string) =>
  parseInt(value) >= 1 && parseInt(value) <= 10 ? "" : "Wrong quantity";
const composeValidators =
  (...validators: Validator[]) =>
  (value: string) =>
    validators.reduce(
      (error: string, validator) => error || validator(value),
      ""
    );

export default function FormMain() {
  function onSubmit(values: any): void {
    async function postData() {
      try {
        const response = await axios.post(
          "https://frosty-wood-6558.getsandbox.com:443/dishes",
          values
        );

        console.log(response.data);

        alert(`Details of your ${values.type} have been submitted!`);
      } catch (error: any) {
        console.log(error);
      }
    }

    postData();
  }

  return (
    <FormBox>
      <FormPaper elevation={5}>
        <FormLabelElement>Dish Selection Form</FormLabelElement>

        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <TextFieldElement
                      {...input}
                      type="text"
                      label="Dish name"
                    />

                    <br />

                    {meta.error && meta.touched && (
                      <FormError>{meta.error}</FormError>
                    )}
                  </div>
                )}
              </Field>

              <Field
                name="preparation_time"
                validate={composeValidators(required, timeFormat)}
              >
                {({ input, meta }) => (
                  <div>
                    <TextFieldElement
                      {...input}
                      type="text"
                      label="Preparation time [hh:mm:ss]"
                    />

                    <br />

                    {meta.error && meta.touched && (
                      <FormError>{meta.error}</FormError>
                    )}
                  </div>
                )}
              </Field>

              <Field name="type" component="select" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <Select {...input}>
                      <option value="default">---</option>

                      <option value="pizza">Pizza</option>

                      <option value="soup">Soup</option>

                      <option value="sandwich">Sandwich</option>
                    </Select>

                    <br />

                    {meta.error && meta.touched && (
                      <FormError>{meta.error}</FormError>
                    )}
                  </div>
                )}
              </Field>

              <FormCondition when="type" is="pizza">
                <Field
                  name="no_of_slices"
                  validate={composeValidators(required, pizzaSlices)}
                  parse={parse}
                >
                  {({ input, meta }) => (
                    <div>
                      <TextFieldElement
                        {...input}
                        type="number"
                        label="Number of slices (1-16)"
                        inputProps={{
                          step: "1",
                          min: 1,
                          max: 16,
                        }}
                      />
                      <br />

                      {meta.error && meta.touched && (
                        <FormError>{meta.error}</FormError>
                      )}
                    </div>
                  )}
                </Field>

                <Field
                  name="diameter"
                  validate={composeValidators(required, pizzaDiameter)}
                  parse={parseDiameter}
                >
                  {({ input, meta }) => (
                    <div>
                      <TextFieldElement
                        {...input}
                        type="number"
                        label="Diameter (15-60cm)"
                        inputProps={{
                          step: "0.1",
                          min: 15,
                          max: 60,
                        }}
                      />
                      <br />

                      {meta.error && meta.touched && (
                        <FormError>{meta.error}</FormError>
                      )}
                    </div>
                  )}
                </Field>
              </FormCondition>

              <FormCondition when="type" is="soup">
                <Field
                  name="spiciness_scale"
                  validate={composeValidators(required, soupSandwichNumber)}
                  parse={parse}
                >
                  {({ input, meta }) => (
                    <div>
                      <TextFieldElement
                        {...input}
                        type="number"
                        label="Spiciness scale (1-10)"
                        inputProps={{
                          step: "1",
                          min: 1,
                          max: 10,
                        }}
                      />
                      <br />

                      {meta.error && meta.touched && (
                        <FormError>{meta.error}</FormError>
                      )}
                    </div>
                  )}
                </Field>
              </FormCondition>

              <FormCondition when="type" is="sandwich">
                <Field
                  name="slices_of_bread"
                  validate={composeValidators(required, soupSandwichNumber)}
                  parse={parse}
                >
                  {({ input, meta }) => (
                    <div>
                      <TextFieldElement
                        {...input}
                        type="number"
                        label="Slices of bread (1-10)"
                        inputProps={{
                          step: "1",
                          min: 1,
                          max: 10,
                        }}
                      />
                      <br />

                      {meta.error && meta.touched && (
                        <FormError>{meta.error}</FormError>
                      )}
                    </div>
                  )}
                </Field>
              </FormCondition>

              <FormButtons
                form={form}
                submitting={submitting}
                pristine={pristine}
              />
            </form>
          )}
        />
      </FormPaper>
    </FormBox>
  );
}
