import Button from "@mui/material/Button";
import { FormApi } from "final-form";
import { Buttons } from "./styles/Buttons.styled";

interface FormButtonsProps {
  form: FormApi<any, Partial<any>>;
  submitting: boolean;
  pristine: boolean;
}

export default function FormButtons({
  form,
  submitting,
  pristine,
}: FormButtonsProps) {
  return (
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
  );
}
