import { useState, useEffect, useCallback } from "react";
import axios from "axios";

//TODO: refactor to use just one: useFetch or useFetchCallback
export const useFetch = (method: any, url: any, body: any, headers: any) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [apiData, setApiData] = useState<Object>({});
  const [serverError, setServerError] = useState(null);

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
          setServerError(error);
          setIsLoading(false);
        }
      };

      fetchData();
    },
    [url, method, body]
  );

  return { isLoading, apiData, serverError, execute };
};
