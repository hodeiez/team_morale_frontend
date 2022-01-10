import { Notification } from "grommet";

type NotificationT = {
  message: string;
};

export const Error = (props: NotificationT) => {
  return (
    <Notification
      toast
      title="Error"
      message={props.message}
      status="critical"
      onClose={() => {}}
    />
  );
};