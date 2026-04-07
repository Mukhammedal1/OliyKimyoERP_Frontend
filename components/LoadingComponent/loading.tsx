import { SpinnerWrapper } from "./loading.style";

const Spinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <div className="loader"></div>
    </SpinnerWrapper>
  );
};

export default Spinner;


