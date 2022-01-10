import { useState, useCallback } from "react";
import { Box, Form, FormField, Select, Button } from "grommet";
//import { fetchit } from "../../commons/hooks/useFetch";
//import * as API from "../../commons/apiConstants";
//import { initialState, reducer } from "./../../commons/baseReducer";
import * as I from "grommet-icons";
const options = [...new Array(10)].map((_, i) => {
  return { label: "level " + (i + 1), value: i + 1 };
}); /* format to send
"energy":6,
"well_being": 1,
"production":10,
"user_teams": 11
 */

export function EvaluationForm(props: any) {
  const [value, setValue]: any = useState({});
  // const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = useCallback((nextValue) => {
    setValue(nextValue);
  }, []);
  //TODO:return the state, and validate before sending data
  const onSubmit = () => {
    /*  const my = Object.keys(value).reduce((acc: any, val: string) => {
      acc[val] = value[val].value;
      return acc;
    }, {});
    const toPost = { ...my, ...{ user_teams: props.userTeamId } };
    console.log(toPost);
    fetchit(API.postEvaluation(), dispatch, {
      method: "POST",
      body: JSON.stringify(toPost),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }); */
  };
  return (
    <Box pad="small" alignContent="center" alignSelf="center">
      <Form value={value} onChange={onChange} onSubmit={() => onSubmit()}>
        <Box direction="row">
          <FormField label="Energy" name="energy">
            <Select
              name="energy"
              placeholder="level"
              options={options}
              labelKey="label"
              valueKey="value"
              icon={<I.CaretDownFill color="dark-4" />}
            />
          </FormField>
          <FormField label="Production" name="production">
            <Select
              name="production"
              placeholder="level"
              options={options}
              labelKey="label"
              valueKey="value"
              icon={<I.CaretDownFill color="dark-4" />}
            />
          </FormField>
          <FormField label="Well-being" name="well_being">
            <Select
              name="well_being"
              placeholder="level"
              options={options}
              labelKey="label"
              valueKey="value"
              icon={<I.CaretDownFill color="dark-4" />}
            />
          </FormField>
        </Box>
        <Box alignContent="center">
          <Button
            alignSelf="center"
            type="submit"
            size="small"
            label="Update"
            color="dark-4"
            primary
            style={{ color: "white" }}
          />
        </Box>
      </Form>
    </Box>
  );
}
