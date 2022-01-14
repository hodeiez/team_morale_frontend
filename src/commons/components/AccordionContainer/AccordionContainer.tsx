import { Box, ThemeContext, Accordion, AccordionPanel } from "grommet";
import * as S from "./styled";
type Props = {
  color: string;
  name: string;
  children: any;
};
export const AccordionContainer = (props: Props) => {
  const color = props.color;
  const richAccordionTheme = {
    accordion: {
      icons: {
        collapse: "none",
        expand: "none",
        color: "gray",
      },
      panel: {
        border: {
          side: "horizontal",
          size: "medium",
          color: color,
        },
      },
    },
  };
  return (
    <Box alignSelf="center" width="100%" pad="small">
      <ThemeContext.Extend value={richAccordionTheme}>
        <Accordion>
          <AccordionPanel
            header={
              <S.PanelHeading
                alignSelf="center"
                textAlign="center"
                level={2}
                color="dark-2"
                margin="auto"
              >
                {props.name}
              </S.PanelHeading>
            }
          >
            <Box
              background="light-3"
              round="10px"
              /* overflow="auto" */ height="auto"
            >
              <Box height="auto" pad="medium">
                {props.children}
              </Box>
            </Box>
          </AccordionPanel>
        </Accordion>
      </ThemeContext.Extend>
    </Box>
  );
};
