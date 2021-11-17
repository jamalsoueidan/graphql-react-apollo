
import Button from "@mui/material//Button";
import TextField from "@mui/material//TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { Form, FormikProps } from "formik";
import * as React from "react";
import withUsers, { WithUsersProps } from "../../../data/with-users";
import * as queries from "../../../generated";
import CustomCheckbox from "./_custom-checkbox";

interface OrganizationFormProps extends WithUsersProps, FormikProps<queries.Organization> {
  action:String
}

const OrganizationForm = ({ errors, touched, values, handleChange, handleBlur, resetForm, action, users }:OrganizationFormProps) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", pl: 2, pr: 2 }}>
        <Typography variant="h6" color="inherit" noWrap>
          {action === 'update' ? "Update" : "Add"} Organization
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
            Pick users belongs to this organization
          </FormLabel>
          <FormGroup>
            {users.map((user: queries.User) => (
              <CustomCheckbox
                key={user?.id}
                name="users"
                label={user?.name}
                value={user?.id}
              />
            ))}
          </FormGroup>
          <FormHelperText>{touched.users && errors.users}</FormHelperText>
        </FormControl>
        <Button color="primary" variant="contained" type="submit">
          {action === 'update'
            ? "Update organization"
            : "Add new organization"}
        </Button>
        <Button color="primary" variant="contained">
          Reset
        </Button>
      </Box>
    </Form>
  )
}

export default withUsers(OrganizationForm)