import { Dot, LoadingWrapper } from "./styled";

export default function Loading() {
  return (
    <LoadingWrapper>
      <Dot delay="0s" color="blue" />
      <Dot delay="0.1s" color="green" />
      <Dot delay="0.2s" color="yellow" />
    </LoadingWrapper>
  );
}
