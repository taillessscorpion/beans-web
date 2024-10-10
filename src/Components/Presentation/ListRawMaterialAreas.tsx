"use client";
import { thousand_fruits } from "../../app/fixed-data";
import ImageThumb from "../Thumb/Image.Thumb";
import RawMaterialArea from "./RawMaterialArea.Presentation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faListUl,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { world_map } from "@/util/ImageLink.util";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import Indicator from "../Thumb/LoadingIndicator";
import OnScreenContext from "@/app/Context/OnScreen.Context";

const DOMAIN = process.env.S3_URL + "O";

const ListRawMaterialAreas = () => {
  const [current, setCurrent] = useState<any>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const { rm } = useContext(OnScreenContext) || { rm: true };

  const goBack = () => {
    setCurrent(null);
  };
  const goNext = () => {
    setIsMoving(true);
    setCurrent(current == thousand_fruits.length - 1 ? 0 : current + 1);
  };
  const goPrevious = () => {
    setIsMoving(true);
    setCurrent(current === 0 ? thousand_fruits.length - 1 : current - 1);
  };


  const renderListRM = useMemo(
    () =>
      thousand_fruits.map((fruit, index) => (
        <RawMaterialArea
          info={fruit}
          key={`Raw-Material-${index}`}
          className={current == index ? "Active" : ""}
          clickHandler={() => {
            setCurrent(index);
          }}
        />
      )),
    [current]
  );

  return (
    <>
      <div
        className="Container RMA__Container"
        data-device={isMobile ? "mobile" : "desktop"}
      >
        <div className="Map">
          <div className={`Container`}>
            <img
              onTransitionEnd={() => {
                setIsMoving(false);
              }}
              onLoad={() => {
                setMapLoading(false);
              }}
              src={DOMAIN + world_map.url}
              alt={world_map.alt}
              style={
                current !== null
                  ? {
                      scale: `${thousand_fruits[current].at?.scale}`,
                      translate: `${thousand_fruits[current].at?.x}% ${thousand_fruits[current].at?.y}%`,
                    }
                  : {}
              }
            />
            {mapLoading ? <Indicator /> : null}
          </div>
          {mapLoading ? null : (
            <div
              className="Dot"
              style={{
                opacity: current === null || isMoving ? "0" : "1",
                transition: isMoving
                  ? "unset"
                  : current === null
                  ? "opacity 0.4s ease-in"
                  : "opacity 0.4s ease-in-out 0.2s",
              }}
            >
              <div className="Container" style={{animationPlayState: rm ? "running":"paused"}}>
                {current !== null ? (
                  <>
                    <img
                      src={DOMAIN + thousand_fruits[current].map.solid.url}
                      alt={thousand_fruits[current].map.solid.alt}
                      style={{ scale: `${thousand_fruits[current].map.scale}` }}
                      decoding="async"
                      data-nimg="1"
                    />
                    <img
                      src={DOMAIN + thousand_fruits[current].map.solid.url}
                      alt={thousand_fruits[current].map.solid.alt}
                      style={{ scale: `${thousand_fruits[current].map.scale}` }}
                      decoding="async"
                      data-nimg="1"
                    />
                  </>
                ) : (
                  <></>
                )}
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={
                    current !== null
                      ? {
                          translate: `${thousand_fruits[current].cursor.x}% ${thousand_fruits[current].cursor.y}%`,
                        }
                      : {}
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="Content">
          <div className="Container">
            <div
              className="List"
              style={{ animationPlayState: rm ? "running" : "paused" }}
            >
              {renderListRM}
              <div className="Pseudo">{renderListRM}</div>
            </div>
          </div>
          <div onClick={goBack} className="Button">
            <FontAwesomeIcon icon={faListUl} />
          </div>
          <div className="Bot-Button-Container">
            <div onClick={goPrevious}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <Link href={`/ngan-hat${thousand_fruits[current]?.post_url}`}>
              Xem chi tiết
            </Link>
            <div onClick={goNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRawMaterialAreas;
