import { useState, useCallback, useEffect } from "react";
import { Box, Form, FormField, Select, Button } from "grommet";
import * as N from "../../commons/components/Notifications";
import * as Address from "../../commons/api/apiConstants";
import * as I from "grommet-icons";
import { useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import { getBearer } from "../../commons/auth/Auth";

//TODO: persist evaluation with id in case user refreshes the page?? and add error notification!.

type Post = {
  energy: number;
  id?: number;
  production: number;
  user_teams: number;
  well_being: number;
};

export function EvaluationForm(props: any) {
  const [value, setValue]: any = useState({});
  const [post, setPost] = useState<Post>({} as Post);
  const [submit, setSubmit] = useState(false);

  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({
    url: Address.createOrUpdate(),
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
      url: Address.createOrUpdate(),
      method: "POST",
      body: post,
      headers: { Authorization: getBearer() },
    });
    setSubmit(false);
  }, [post, execute]);
  useEffect(() => {
    if (submit) {
      if (validateForm(post)) {
        postData();
      } else {
        console.log("ERROR!!!");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  return (
    <Box pad="small" alignContent="center" alignSelf="center">
      {!isLoading && apiData && !serverError && (
        <N.MyToaster
          message={
            "energy: " +
            post.energy +
            " production: " +
            post.production +
            " well_being: " +
            post.well_being +
            " sent!"
          }
          visible={submit}
          type=""
        />
      )}
      {!isLoading && serverError && (
        <N.MyToaster message={serverError} visible={true} type="ERROR" />
      )}
      <Form value={value} onChange={onChange} onSubmit={(e) => onSubmit(e)}>
        <Box direction="row">
          <FormField label="Energy" name="energy" required>
            <Select
              name="energy"
              placeholder="level"
              options={options}
              labelKey="label"
              valueKey="value"
              icon={<I.CaretDownFill color="dark-4" />}
            />
          </FormField>
          <FormField label="Production" name="production" required>
            <Select
              name="production"
              placeholder="level"
              options={options}
              labelKey="label"
              valueKey="value"
              icon={<I.CaretDownFill color="dark-4" />}
            />
          </FormField>
          <FormField label="Well-being" name="well_being" required>
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

const options = [...new Array(10)].map((_, i) => {
  return { label: "level " + (i + 1), value: i + 1 };
});

const validateForm = (post: Post) => {
  return post.production && post.well_being && post.energy;
};
