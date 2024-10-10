import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => (
  <div className="Loading-Indicator">
    <FontAwesomeIcon icon={faCircleNotch} spin />
  </div>
);

export default Loading;
