import { Form, Field } from "react-final-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import axios from "axios";

import { TextFieldElement } from "./styles/TextFieldElement.styled";
import { Select } from "./styles/Select.styled";
import { Buttons } from "./styles/Buttons.styled";

type Validator = (value: string) => string;

interface ConditionTypes {
  when: string;
  is: string;
  children: ReactNode;
}

// return value type set to "any" to bypass the type
// expected by Field's property "parse"
const parse = (value: string): any =>
  isNaN(parseFloat(value)) ? "" : parseFloat(value);
const required = (value: string) =>
  !value || value === "default" ? "Required" : "";
const timeFormat = (value: string) =>
  value[2] === ":" && value[5] === ":" && value.length === 8
    ? ""
    : "Incorrect format";
const composeValidators =
  (...validators: Validator[]) =>
  (value: string) =>
    validators.reduce(
      (error: string, validator) => error || validator(value),
      ""
    );

const Condition = ({ when, is, children }: ConditionTypes) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

export default function FormMain() {
  function onSubmit(values: any): void {
    console.log("values", values);
    async function postData() {
      try {
        const response = await axios.post(
          "https://frosty-wood-6558.getsandbox.com:443/dishes",
          values
        );

        console.log(response.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    postData();
  }

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <div>
                  <TextFieldElement {...input} type="text" label="Dish name" />

                  <br />

                  {meta.error && meta.touched && <span>{meta.error}</span>}
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

                  {meta.error && meta.touched && <span>{meta.error}</span>}
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

                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Condition when="type" is="pizza">
              <Field name="no_of_slices" validate={required} parse={parse}>
                {({ input, meta }) => (
                  <div>
                    <TextFieldElement
                      {...input}
                      type="number"
                      label="Number of slices"
                      inputProps={{
                        step: "1",
                        min: 1,
                        max: 16,
                      }}
                    />
                    <br />

                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field name="diameter" validate={required} parse={parse}>
                {({ input, meta }) => (
                  <div>
                    <TextFieldElement
                      {...input}
                      type="number"
                      label="Diameter"
                      inputProps={{
                        step: "0.1",
                        min: 15,
                        max: 60,
                      }}
                    />
                    <br />

                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </Condition>

            <Condition when="type" is="soup">
              <Field name="spiciness_scale" validate={required} parse={parse}>
                {({ input, meta }) => (
                  <div>
                    <TextFieldElement
                      {...input}
                      type="number"
                      label="Spiciness scale"
                      inputProps={{
                        step: "1",
                        min: 1,
                        max: 10,
                      }}
                    />
                    <br />

                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </Condition>

            <Condition when="type" is="sandwich">
              <Field name="slices_of_bread" validate={required} parse={parse}>
                {({ input, meta }) => (
                  <div>
                    <TextFieldElement
                      {...input}
                      type="number"
                      label="Slices of bread"
                      inputProps={{
                        step: "1",
                        min: 1,
                        max: 8,
                      }}
                    />
                    <br />

                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </Condition>

            <Buttons className="buttons">
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                color="success"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </Buttons>
          </form>
        )}
      />
    </Box>
  );
}
