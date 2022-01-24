import { Text, Box, Button, Form, FormField, TextInput } from "grommet";
import Loading from "../Loading/Loading";

export const LoginFormTemplate = (props: any) => (
  <Box align="center" pad="small">
    <Form onChange={props.update} onSubmit={props.submit}>
      <FormField name="email" htmlFor="email" label="Email" required>
        <TextInput id="email" name="email" type="email" />
      </FormField>

      <FormField name="password" htmlFor="password" label="Password" required>
        <TextInput id="password" name="password" type="password" />
      </FormField>

      <Button type="submit" label="Submit" primary color={props.color} />

      <br></br>
      {props.serverError && !props.isLoading && (
        <Text margin={{ left: "small" }} size="small" color="status-critical">
          {props.serverError}
        </Text>
      )}
    </Form>
    <Box height="1px">{props.isLoading && <Loading />}</Box>
  </Box>
);
