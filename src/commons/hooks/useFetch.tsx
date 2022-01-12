import { useState, useEffect, useCallback, useReducer } from "react";
import axios from "axios";

//TODO: refactor to use just one: useFetch or useFetchCallback
export const useFetch = (method: any, url: any, body: any, headers: any) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [apiData, setApiData] = useState<any>();
  const [serverError, setServerError] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: method,
          url: url,
          data: body,
          headers: headers ? headers : { Accept: "*" },
        });
        const data: any = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { isLoading, apiData, serverError };
};

export const useFetchCallback = (
  method: any,
  url: any,
  body: any,
  headers: any
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const execute = useCallback(
    async (e) => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios({
            method: method,
            url: url,
            data: body,
            headers: headers ? headers : { Accept: "*" },
          });
          const data: any = await resp?.data;

          setApiData(data);
          setIsLoading(false);
        } catch (error: any) {
          setServerError(error.message);
          setIsLoading(false);
        }
      };

      fetchData();
    },
    [url, method, body, headers, setServerError, setIsLoading]
  );

  return { isLoading, apiData, serverError, execute };
};
type fetchOptions = {
  method?: any;
  url: string;
  headers?: any;
  body?: any;
};
export const useFetchPostOrUpdate = (options: fetchOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState<any>(null);

  const execute = useCallback(
    async (options: fetchOptions) => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios({
            method: options.method,
            url: options.url,
            data: options.body,
            headers: options.headers ? options.headers : { Accept: "*" },
          });

          const data: any = await resp?.data;

          setApiData(data);
          setIsLoading(false);
        } catch (error: any) {
          setServerError(error.message);
          setIsLoading(false);
        }
      };

      fetchData();
    },
    [options]
  );

  return { isLoading, apiData, serverError, execute };
};
//the new useFetch
type Options = {
  method: string;
  body: any;
  headers: any;
};

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

export const fetchit = async (
  url: string,
  dispatch: (r: any) => void,
  options?: Options
) => {
  await fetch(url, {
    method: options ? options.method : "GET",
    body: options ? options.body : null,
    headers: options ? options.headers : { Accept: "*" },
  })
    .then(handleErrors)
    .then((response) => {
      dispatch({ type: "FETCH_SUCCESS", payload: response });
    })
    .catch((error) => {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    });
};

export const initialState = {
  loading: true,
  error: "",
  post: {},
};
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { loading: false, post: action.payload, error: "" };
    case "FETCH_ERROR":
      return {
        loading: false,
        post: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFetch2 = (url: string, options?: Options) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchit(url, dispatch, options);
  }, [url, dispatch]);
  return { state };
};
export const useCallBackFetch = (url: string, options?: Options) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useCallback(() => {
    fetchit(url, dispatch, options);
  }, [url, dispatch]);
  return { state };
};
