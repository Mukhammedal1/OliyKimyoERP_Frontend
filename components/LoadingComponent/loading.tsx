import { LoadingText, SpinnerCircle, SpinnerWrapper } from "./loading.style";

const Spinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <SpinnerCircle />
      <LoadingText>Yuklanmoqda...</LoadingText>
    </SpinnerWrapper>
  );
};

export default Spinner;
