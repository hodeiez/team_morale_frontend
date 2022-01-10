import {
  Tip,
  Text,
  CardFooter,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "grommet";
import { Link, useNavigate } from "react-router-dom";
import * as I from "grommet-icons";
import { useRandomColorCard, greyPalleteColors } from "../../commons/utils";
export const TeamCard = (props: any) => {
  const history = useNavigate();
  return (
    <Card pad="small" background={useRandomColorCard(greyPalleteColors)}>
      <CardHeader
        background="rgba(0, 0, 0, 0.1)"
        alignSelf="center"
        pad="medium"
        width="100%"
        round="25px"
      >
        <I.Workshop />
        <Text weight="bold" color="white" alignSelf="center">
          {props.name}
        </Text>
      </CardHeader>
      <CardBody alignSelf="center">
        {/*  <Tip
          content="Check the team details"
          dropProps={{ background: "rgba(104,160,107,0.2);", round: "16px" }}
        > */}
        <Button
          label="Details"
          primary
          color="rgba(104,160,107,0.7);"
          margin="5px"
          onClick={() =>
            history("/team", {
              state: { userTeamId: props.userTeamsid, id: props.id },
            })
          }
        />
        {/*  </Tip> */}
        {/*  <Tip
          content="Go to live meeting"
          dropProps={{ background: "rgba(173,81,81,0.2)", round: "16px" }}
        > */}
        <Button
          label="Go Live!"
          primary
          color="rgba(173,81,81,0.7);"
          margin="5px"
          onClick={() =>
            history("/event", {
              state: { userTeamId: props.userTeamsid, id: props.id },
            })
          }
        />
        {/*  </Tip> */}
      </CardBody>
      <Tip
        content={props.members.map((member: string) => (
          <Text size="small" alignSelf="center">
            {member}
          </Text>
        ))}
      >
        <Text size="small" alignSelf="center">
          Members {props.members.length}
        </Text>
      </Tip>

      <CardFooter>
        <Text size="small" alignSelf="center">
          Start date: {props.startDate}
        </Text>
        <Text size="small" alignSelf="center">
          Last update: {props.lastUpdateDate}
        </Text>
      </CardFooter>
    </Card>
  );
};
