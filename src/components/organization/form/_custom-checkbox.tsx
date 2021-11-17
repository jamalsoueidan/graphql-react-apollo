
import { Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";
import * as React from "react";


const CustomCheckbox = ({ label, ...props }: any) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value.includes(props.value)}
          {...field}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox