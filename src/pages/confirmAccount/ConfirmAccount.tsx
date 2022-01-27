import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmAccount } from "../../commons/api/apiConstants";
import { useFetch2 } from "../../commons/hooks/useFetch";

export const ConfirmAccount = () => {
  const [params] = useSearchParams();
  const history = useNavigate();

  const { state } = useFetch2(confirmAccount(), {
    headers: { Authorization: params.get("token") },
  });

  return (
    <>
      {params.get("token")}
      {!state.isLoading && !state.error && state.post && history("/")}
      {state.error && <p>there was an error</p>}
    </>
  );
};
