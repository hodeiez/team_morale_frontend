import { Box, Button, Heading, Layer, Text } from "grommet";
import { useState } from "react";

type Props = {
  delete: any;
  onClose: any;
  message: string;
};

export const ConfirmationModal = (props: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const onClose = () => setOpen(props.onClose);
  const onDelete = () => {
    props.delete(true);
    setOpen(props.onClose);
  };
  return (
    <>
      {open && (
        <Layer
          id="hello world"
          position="center"
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Confirm
            </Heading>
            <Text>Are you sure you want to delete?</Text>
            <Text size="small">{props.message}</Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button label="Cancel" onClick={onClose} color="dark-3" />
              <Button
                label={
                  <Text color="white">
                    <strong>Delete</strong>
                  </Text>
                }
                onClick={() => {
                  onDelete();
                }}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
