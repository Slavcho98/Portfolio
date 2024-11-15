import { Audio } from "react-loader-spinner";

function Spinner() {
  return (
    <div>
      <Audio height="80" width="80" color="green" ariaLabel="loading" />
    </div>
  );
}

export default Spinner;
