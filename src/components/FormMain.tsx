import { Form, Field } from "react-final-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import { TextFieldElement } from "./styles/TextFieldElement.styled";
import { Select } from "./styles/Select.styled";
import { Buttons } from "./styles/Buttons.styled";
import FormFieldNumber from "./FormFieldNumber";

const onSubmit = async (values: any) => {
  // await sleep(300);
  // window.alert(JSON.stringify(values));
  alert("submitted!");
};

interface Errors {
  [key: string]: string;
}

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
  const [options, setOptions] = useState<string[]>([]);

  // update options on dishType change
  useEffect(() => {
    type StateKey = keyof typeof formData;

    const key = formData.dishType as StateKey;

    if (formData.dishType) setOptions(Object.keys(formData[key]));
  }, [formData, formData.dishType]);

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.dishName) errors.dishName = "Required";
          if (!values.preparationTime) errors.preparationTime = "Required";
          if (!formData.dishType) errors.dishType = "Required";
          if (!values.numberOfSlices) errors.numberOfSlices = "Required";

          options.forEach((option) => {
            if (!values[option]) errors[option] = "Required";
          });

          // else if (values.confirm !== values.password) {
          //   errors.confirm = "Must match";
          // }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="dishName">
              {({ input, meta }) => (
                <div>
                  <TextFieldElement {...input} type="text" label="Dish name" />

                  <br />

                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="preparationTime">
              {({ input, meta }) => (
                <div>
                  <TextFieldElement
                    {...input}
                    type="text"
                    label="Preparation time"
                  />

                  <br />

                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="dishType" component="select">
              {({ input, meta }) => (
                <div>
                  <Select
                    {...input}
                    value={formData.dishType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dishType: e.target.value,
                      })
                    }
                  >
                    <option value="">---</option>

                    <option value="pizza">Pizza</option>

                    <option value="soup">Soup</option>

                    <option value="sandwich">Sandwich</option>
                  </Select>

                  <br />

                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            {options ? (
              <FormFieldNumber formData={formData} options={options} />
            ) : null}

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

            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      />
    </Box>
  );
}
