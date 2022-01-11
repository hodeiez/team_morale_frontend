import { useState, useCallback } from "react";
import { Box, Form, FormField, Select, Button } from "grommet";
//import { fetchit } from "../../commons/hooks/useFetch";
//import * as API from "../../commons/apiConstants";
//import { initialState, reducer } from "./../../commons/baseReducer";
import * as N from "../../commons/components/Notifications";
import * as Address from "../../commons/api/apiConstants";
import * as I from "grommet-icons";
import { useFetchPostOrUpdate } from "../../commons/hooks/useFetch";

//TODO: fix update after first post, and implement validation.
const options = [...new Array(10)].map((_, i) => {
  return { label: "level " + (i + 1), value: i + 1 };
});
type Post = {
  energy: number;
  id?: number;
  production: number;
  user_teams: number;
  well_being: number;
};

const validateForm = (post: Post) => {
  if (post.production & post.well_being & post.energy) return true;
  return false;
};

export function EvaluationForm(props: any) {
  const [value, setValue]: any = useState({});
  const [post, setPost] = useState<Post>({} as Post);
  const [isUpdate, setIsUpdate] = useState(false);

  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({
    url: Address.sendEvaluation(),
    //method: isUpdate ? "PUT" : "POST",
  });
  const onChange = useCallback((nextValue) => {
    setValue(nextValue);
  }, []);

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const updated = Object.keys(value)
        .sort()
        .reduce((acc: any, val: string) => {
          acc[val] = value[val].value;
          return acc;
        }, {});
      const toPost = {
        ...{ ...post, ...updated },
        ...{ user_teams: props.userTeamId },
      };
      // setPost(toPost);
      setIsUpdate(true);
      console.log(toPost);

      console.log(post);
      await execute({
        url: Address.sendEvaluation(),
        method: isUpdate ? "PUT" : "POST",
        body: toPost,
      });
      const resp: Post = apiData!;
      if (apiData) {
        setPost({ ...toPost, id: resp.id });
      } else setPost(toPost);
    },
    [
      execute,
      setPost,
      apiData,
      setIsUpdate,
      post,
      props.userTeamId,
      value,
      isUpdate,
    ]
  );
  return (
    <Box pad="small" alignContent="center" alignSelf="center">
      {/*    {JSON.stringify(post)}
      {JSON.stringify(isUpdate)}
      <br></br>
      {JSON.stringify(isLoading)}
      <br></br>
      {JSON.stringify(apiData)}
      <br></br>
      {JSON.stringify(serverError)}
      <br></br> */}
      <Form value={value} onChange={onChange} onSubmit={(e) => onSubmit(e)}>
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
