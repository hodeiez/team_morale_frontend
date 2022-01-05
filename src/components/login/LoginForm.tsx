import { Box, Button, Form, Text, FormField, TextInput } from "grommet";

export const LoginForm = (props: any) => {
  const submit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box align="center" pad="small">
      <Form /* onChange={update} */ onSubmit={submit}>
        <FormField name="email" htmlFor="email" label="Email" required>
          <TextInput id="email" name="email" type="email" />
        </FormField>

        <FormField name="password" htmlFor="password" label="Password" required>
          <TextInput id="password" name="password" type="password" />
        </FormField>

        <Button type="submit" label="Submit" primary color={props.color} />

        <Text
          margin={{ left: "small" }}
          size="small"
          color="status-critical"
        ></Text>
      </Form>
    </Box>
  );
};
