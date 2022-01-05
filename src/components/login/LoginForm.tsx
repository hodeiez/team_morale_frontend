import { Box, Button, Form, Text, FormField, TextInput } from "grommet";

export const LoginForm = () => {
  const submit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box align="center" pad="small">
      <Form /* onChange={update} */ onSubmit={submit}>
        <FormField name="username" htmlFor="username" label="Username" required>
          <TextInput id="username" name="username" />
        </FormField>

        <FormField name="password" htmlFor="password" label="Password" required>
          <TextInput id="password" name="password" type="password" />
        </FormField>

        <Button type="submit" label="Submit" primary color="accent-4" />

        <Text margin={{ left: "small" }} size="small" color="status-critical">
          * Required Field
        </Text>
      </Form>
    </Box>
  );
};
