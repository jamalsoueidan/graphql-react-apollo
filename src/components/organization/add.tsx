import Button from "@mui/material//Button";
import TextField from "@mui/material//TextField";
import FormGroup from "@mui/material/FormGroup";
import { Form, Formik, FormikProps, useField } from "formik";
import * as queries from "../../generated";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface MyFormValues {
  name: string;
  users: string[];
}

const MyCheckbox = ({ label, user, ...props }: any) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      control={<Checkbox {...field} {...props} />}
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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {(props: FormikProps<MyFormValues>) => (
          <Form>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              autoComplete="off"
            />

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

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOrganization;
