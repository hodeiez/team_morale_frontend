import { Notification } from "grommet";
import { useState } from "react";

type NotificationT = {
  message: string;
  type?: string;
  visible?: boolean;
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
export const Success = (props: NotificationT) => {
  return (
    <Notification
      toast
      title="Success"
      message={props.message}
      status="normal"
      onClose={() => {}}
    />
  );
};
export const MyToaster = (props: NotificationT) => {
  const [visible, setVisible] = useState(props.visible);
  return visible && props.type === "ERROR" ? (
    <Notification
      toast
      title="Error"
      message={props.message}
      status="critical"
      onClose={() => setVisible(false)}
    />
  ) : (
    <Notification
      toast
      title="Success"
      message={props.message}
      status="normal"
      onClose={() => setVisible(undefined)}
    />
  );
};
