import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeDropper,
  faHandSparkles,
  faLeaf,
  faMountain,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
import Robusta from "../Icon/Robusta.Icon";
import Arabica from "../Icon/Arabica.Icon";
import Image from "../Thumb/Image.Thumb";

interface Info {
  from: {
    province: string;
    place: string;
  };
  thumbnail: string;
  type: string;
  altitudes: number[];
  processes: string[];
  color: string;
  tastes: string[][];
  articles: string[];
}
interface Props {
  info: Info;
  clickHandler: () => void;
  className: string;
}

const RawMaterialArea = ({
  info,
  clickHandler,
  className,
}: Props) => {
  const renderInfo = () => {
    let firstElement;
    const listElement = info.tastes.map((taste, index) => {
      const element = (key: string) => (
        <li key={`Process-And-Tastes-${index}-${key}`}>
          <div className="Line">
            <div className="Icon">
              <FontAwesomeIcon icon={faHandSparkles} />
            </div>
            <p className="Direct-Text">{info.processes[index]}</p>
          </div>
          <div className="Line">
            <div className="Icon">
              <FontAwesomeIcon icon={faMugHot} />
            </div>
            <div className="Text">
              <div className="Container">
                <p>
                  {taste.map((single, sIndex) => {
                    if (sIndex < taste.length - 1) return single + ", ";
                    else return single + " •";
                  })}
                </p>
                <p>
                  {taste.map((single, sIndex) => {
                    if (sIndex < taste.length - 1) return single + ", ";
                    else return single + " •";
                  })}
                </p>
              </div>
            </div>
          </div>
        </li>
      );
      if (index === 0) firstElement = element("pseudo");
      return element("");
    });
    if (info.tastes.length > 1) return [...listElement, firstElement];
    return listElement;
  };
  return (
    <div className="Wrapper">
      <div onClick={clickHandler} className={`Box ${className}`}>
        <Image
          url={info.thumbnail}
          alt={`Hình ảnh của vùng trồng ${info.from.place} - ${info.from.province}`}
          useSkeleton={true}
          useResize={false}
          useOversize={true}
        />
        <div className="Info">
          <div className="Primary">
            {info.type == "Robusta" ? (
              <Robusta className="Type" />
            ) : info.type == "Arabica" ? (
              <Arabica className="Type" />
            ) : (
              <></>
            )}
            <h3 className="From">
              {info.from.place} - {info.from.province}
            </h3>
          </div>

          <div className="Secondary">
            <div className="Line">
              <div className="Icon">
                <FontAwesomeIcon icon={faLeaf} />
              </div>
              <p className="Direct-Text">{info.type}</p>
            </div>
            <div className="Line">
              <div className="Icon">
                <FontAwesomeIcon icon={faMountain} />
              </div>
              <p className="Direct-Text">
                {info.altitudes[0]}
                {info.altitudes.length > 1 ? " - " + info.altitudes[1] : ""}
              </p>
            </div>
            <div className="Line">
              <div className="Icon">
                <FontAwesomeIcon icon={faEyeDropper} />
              </div>
              <p className="Direct-Text">{info.color}</p>
            </div>
            <div className="Line">
              <div className="Icon">
                <FontAwesomeIcon icon={faHandSparkles} />
              </div>

              <p className="Direct-Text">
                {info.processes[0]}
                {info.processes.length > 1 ? " • " + info.processes[1] : ""}
              </p>
            </div>
            <div className="Line">
              <div className="Icon">
                <FontAwesomeIcon icon={faMugHot} />
              </div>

              <p className="Direct-Text">
                <span>
                  {info.tastes[0].map((single, sIndex) => {
                    if (sIndex < info.tastes[0].length - 1)
                      return single + ", ";
                    else return single + ".";
                  })}
                </span>
                {info.tastes.length > 1 ? (
                  <>
                    <span className="Separation"> • </span>
                    <span>
                      {info.tastes[1].map((single, sIndex) => {
                        if (sIndex < info.tastes[1].length - 1)
                          return single + ", ";
                        else return single + ".";
                      })}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
            <ul className={`${info.processes.length > 1 ? "Animation" : ""}`}>
              {renderInfo()}
            </ul>
            <div className="Article">
              {info.articles.map((article, index) => (
                <p key={`Info-Article-${index}`}>{article}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RawMaterialArea;
