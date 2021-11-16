import Button from "@mui/material//Button";
import TextField from "@mui/material//TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { Form, Formik, useField } from "formik";
import * as React from "react";
import * as Yup from "yup";
import withUsers, { WithUsersProps } from "../../data/with-users";
import * as queries from "../../generated";
import Typography from "@mui/material/Typography";

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

const AddOrganization = ({ users }: WithUsersProps) => {
  const initialValues: MyFormValues = { name: "", users: [] };
  const [addOrganizationMutation] = queries.useAddOrganizationMutation({
    refetchQueries: [queries.OrganizationsDocument, "Organizations"],
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await addOrganizationMutation({
          variables: values,
        });
        actions.resetForm();
      }}
    >
      {({ errors, touched, values, handleChange, handleBlur }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", pl: 2, pr: 2 }}>
            <Typography variant="h6" color="inherit" noWrap>
              Add Organization
            </Typography>
            <FormControl
              required
              component="fieldset"
              margin="dense"
              variant="standard"
              sx={{ pb: 1 }}
            >
              <TextField
                name="name"
                label="name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </FormControl>
            <FormControl
              required
              error={touched.users && Boolean(errors.users)}
              component="fieldset"
            >
              <FormLabel component="legend">
                Pick one users belongs to this organization
              </FormLabel>
              <FormGroup>
                {users.map((user: queries.User) => (
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default withUsers(AddOrganization);
