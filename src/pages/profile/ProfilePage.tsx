import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  ResponsiveContext,
  Text,
  TextInput,
} from "grommet";
import { useContext } from "react";
import { getUser } from "../../commons/auth/Auth";

export const ProfilePage = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid pad="medium" columns={size !== "small" ? "40%" : "100%"} gap="medium">
      <Box align="center">
        <Text>About me</Text>
        <Form onChange={() => {}} onSubmit={() => {}}>
          <FormField name="username">
            <TextInput
              id="username-input"
              name="username"
              defaultValue={getUser().username}
            />
          </FormField>

          <Text>{getUser().email}</Text>
          <Box
            pad="large"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button type="submit" color="accent-4" label="Update" primary />
          </Box>
        </Form>
      </Box>
      <Box align="center">
        <Text>Update password</Text>
        <Form onChange={() => {}} onSubmit={() => {}}>
          <FormField name="old-pass">
            <TextInput
              id="old-pass"
              name="old-pass"
              placeholder="old pass here"
              type="password"
            />
          </FormField>
          <FormField name="new-pass">
            <TextInput
              id="new-pass"
              name="new-pass"
              placeholder="new pass here"
              type="password"
            />
          </FormField>
          <Box
            pad="large"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              color="accent-4"
              label="Update Pass"
              primary
            />
          </Box>
        </Form>
      </Box>
    </Grid>
  );
};
