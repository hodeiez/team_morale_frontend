import { FormField, TextInput } from "grommet";
import { FC } from "react";
type OwnProps = {
  id: number;
};
export type MemberProps = {
  id: number;
  email: string;
};
export const MemberField: FC<OwnProps> = (props: any) => {
  return (
    <FormField name={"" + props.id} label="Member email" type="email">
      <TextInput
        id={"" + props.id}
        name={"email" + props.id}
        placeholder="Member email"
        type="email"
        required
      />
    </FormField>
  );
};
