import { Form, Field } from "react-final-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState } from "react";

// const TextFieldStyled = styled(TextField)`
//   background-color: red;
// `

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: any) => {
  await sleep(300);
  window.alert(JSON.stringify(values));
};

const required = (value: any) => (value ? undefined : "Required");
// const mustBeNumber = (value: any) =>
//   isNaN(value) ? "Must be a number" : undefined;
// const minValue = (min: any) => (value: any) =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
// const composeValidators =
//   (...validators: any) =>
//   (value: any) =>
//     validators.reduce(
//       (error: any, validator: any) => error || validator(value),
//       undefined
//     );

export default function FormMain() {
  const [formData, setFormData] = useState({
    dishName: "",
    preparationTime: "",
    dishType: "",
    pizza: {
      numberOfSlices: 0, // number
      diameter: 0, // floating point
    },
    soup: {
      spicinessScale: 0,
    },
    sandwich: {
      slicesOfBread: 0,
    },
  });

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="dishName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <TextField {...input} type="text" label="Dish name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="preparationTime" validate={required}>
              {({ input, meta }) => (
                <div>
                  <TextField {...input} type="text" label="Preparation time" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="dishType" component="select" validate={required}>
              {({ input, meta }) => (
                <div>
                  <select {...input}>
                    <option />

                    <option value="pizza">Pizza</option>

                    <option value="soup">Soup</option>

                    <option value="sandwich">Sandwich</option>
                  </select>
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            {/* <Field
              name="age"
              validate={composeValidators(required, mustBeNumber, minValue(18))}
            >
              {({ input, meta }) => (
                <div>
                  <TextField {...input} type="text" label="Dish type" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field> */}

            <div className="buttons">
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
            </div>

            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      />
    </Box>
  );
}
