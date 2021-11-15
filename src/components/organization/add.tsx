import Button from "@mui/material//Button";
import TextField from "@mui/material//TextField";
import { Form, Formik } from "formik";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as queries from "../../generated";

interface MyFormValues {
  name: string;
  users: string[];
}

const AddOrganization = () => {
  const initialValues: MyFormValues = { name: "", users: ["1"] };
  const { data, error, loading } = queries.useUsersQuery();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      //arr.push(value);
    } else {
      //arr.splice(arr.indexOf(value), 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
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
            <FormControlLabel
              key={user?.id}
              control={
                <Checkbox
                  name="users"
                  id="users"
                  value={user?.id || ""}
                  onChange={handleChange}
                />
              }
              label={user?.name || ""}
            />
          ))}
        </FormGroup>

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default AddOrganization;
