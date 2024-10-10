import {
  faLandmarkFlag,
  faPeopleCarryBox,
  faStore,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EventInfo {
  date: string;
  type: string;
  title: string;
  sub_title: any;
}

const Event = ({
  className,
  toggleHandler,
  event,
}: {
  className: string;
  toggleHandler: () => void;
  event: EventInfo;
}) => {
  const { date, type, title, sub_title } = event;
  return (
    <div className={`Point ${className}`} onClick={toggleHandler}>
      <div className="Info">
        {type == "workshop" ? (
          <FontAwesomeIcon icon={faUsersRectangle} />
        ) : type == "donation" ? (
          <FontAwesomeIcon icon={faPeopleCarryBox} />
        ) : type == "store" ? (
          <FontAwesomeIcon icon={faStore} />
        ) : type == "start" ? (
          <FontAwesomeIcon icon={faLandmarkFlag} />
        ) : (
          <></>
        )}
      </div>
      <div className="Time">
        <div>{date}</div>
        <div>{title}</div>
        {sub_title ? <div>{sub_title}</div> : <></>}
      </div>
      <div className="Dot"></div>
    </div>
  );
};

export default Event;
