import Button from "@mui/material//Button";
import TextField from "@mui/material//TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { Form, Formik, useField } from "formik";
import * as React from "react";
import * as Yup from "yup";
import * as queries from "../../generated";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  users: Yup.array().min(1, "Pick at least 1 user").required("required"),
});

interface MyFormValues {
  name: string;
  users: string[];
}

const MyCheckbox = ({ label, ...props }: any) => {
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

const AddOrganization = () => {
  const initialValues: MyFormValues = { name: "", users: [] };
  const { data, error, loading } = queries.useUsersQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormControl
            required
            component="fieldset"
            margin="dense"
            variant="standard"
            fullWidth
          >
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              autoComplete="off"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </FormControl>
          <FormControl
            required
            error={touched.users && Boolean(errors.users)}
            component="fieldset"
            variant="standard"
            fullWidth
          >
            <FormLabel component="legend">
              Pick one users belongs to this organization
            </FormLabel>
            <FormGroup>
              {data.users?.map((user) => (
                <MyCheckbox
                  key={user?.id}
                  name="users"
                  label={user?.name}
                  value={user?.id}
                />
              ))}
            </FormGroup>
            <FormHelperText>{touched.users && errors.users}</FormHelperText>
          </FormControl>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrganization;
