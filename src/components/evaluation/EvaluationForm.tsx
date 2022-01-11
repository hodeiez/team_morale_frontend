import { useState, useCallback, useEffect } from "react";
import { Box, Form, FormField, Select, Button } from "grommet";
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
  const [submit, setSubmit] = useState(false);

  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({
    url: Address.sendEvaluation(),
  });
  const onChange = useCallback((nextValue) => {
    setValue(nextValue);
  }, []);

  const onSubmit = (e: any) => {
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
    apiData
      ? setPost({ ...toPost, id: (apiData as Post).id })
      : setPost(toPost);
    setSubmit(true);
  };
  const postData = useCallback(async () => {
    await execute({
      url: Address.sendEvaluation(),
      method: post.id ? "PUT" : "POST",
      body: post,
    });
  }, [post]);
  useEffect(() => {
    if (submit) {
      postData();
    }
  }, [postData, submit]);

  return (
    <Box pad="small" alignContent="center" alignSelf="center">
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
