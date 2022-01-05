import { Box, ThemeContext, Heading, Accordion, AccordionPanel } from "grommet";
import * as I from "grommet-icons";
import { LoginForm } from "../../components/login/LoginForm";

const richAccordionTheme = {
  accordion: {
    icons: {
      collapse: I.SubtractCircle,
      expand: I.AddCircle,
      color: "gray",
    },

    panel: {
      border: {
        side: "horizontal",
        size: "medium",
        color: "accent-4",
      },
    },
  },
};

export const HomePage = () => {
  return (
    <Box alignSelf="center" width="100%" pad="large">
      <ThemeContext.Extend value={richAccordionTheme}>
        <Accordion>
          <AccordionPanel
            label={
              <Box
                direction="row"
                align="center"
                gap="small"
                pad={{ horizontal: "medium" }}
              >
                <Heading level={2} color="dark-2">
                  Login
                </Heading>
              </Box>
            }
          >
            <Box background="light-1" overflow="auto" height="medium">
              <Box height="large" pad="medium">
                <LoginForm />
              </Box>
            </Box>
          </AccordionPanel>
        </Accordion>
      </ThemeContext.Extend>
    </Box>
  );
};
