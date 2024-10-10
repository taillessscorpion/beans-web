"use client";

import dynamic from "next/dynamic";
import { fillNumberPad } from "@/util/index.util";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { histories, plans } from "../app/fixed-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock as faClockS,
  faReply,
  faReplyAll,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { faClock as faClockR } from "@fortawesome/free-regular-svg-icons";
import { histories_cover, plan_cover } from "@/util/ImageLink.util";
import { isMobile } from "react-device-detect";
import ScreenSizeContext from "@/app/Context/ScreenSize.Context";
import Image from "./Thumb/Image.Thumb";
import OnScreenContext from "@/app/Context/OnScreen.Context";
const Event = dynamic(() => import("./Event"), { ssr: false });

const historiesFlat = histories.flat(1);
const idList = historiesFlat.map((event) => event.id);
const NOW_INDEX = historiesFlat.length;
const LAST_INDEX = NOW_INDEX + plans.length;
const DOMAIN = process.env.S3_URL;

const Milestone = () => {
  const [targetEvent, setTargetEvent] = useState<number>(NOW_INDEX);
  const [currentEvent, setCurrentEvent] = useState<number>(targetEvent);
  const [loadedCounts, setLoadedCounts] = useState<number>(0);
  const { size } = useContext(ScreenSizeContext);
  const { ms } = useContext(OnScreenContext) || { ms: true };
  const loading = loadedCounts / 2 < LAST_INDEX;

  const getTimeNow = useMemo(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return { day: fillNumberPad(day, 2), month: fillNumberPad(month, 2), year };
  }, []);

  const getBackNow = () => {
    setTargetEvent(NOW_INDEX);
  };

  const getToEvent = (event: number) => {
    setTargetEvent(event);
  };

  useEffect(() => {
    if (targetEvent == currentEvent) return;

    const timeout = setTimeout(() => {
      if (targetEvent > currentEvent) setCurrentEvent(currentEvent + 1);
      if (targetEvent < currentEvent) setCurrentEvent(currentEvent - 1);
    }, 150);
    return () => {
      clearTimeout(timeout);
    };
  }, [targetEvent, currentEvent]);

  const renderHistoryPages = useMemo(() => {
    const list = historiesFlat;
    const currentSize = size == "O" ? "W" : size;
    const lastIndex = list.length - 1;
    const listElement = [
      <div className="Page" key={`Page-${0}`}>
        <div className="Container" onClick={getBackNow}>
          <div className="Image">
            <img
              loading="lazy"
              decoding="async"
              data-nimg="1"
              onLoad={() => {
                setLoadedCounts((prev) => prev + 1);
              }}
              src={DOMAIN + currentSize + list[0].front_face.url}
              alt={list[0].front_face.alt}
            />
          </div>
          <div className="Button">
            <FontAwesomeIcon icon={faReplyAll} flip="horizontal" />
          </div>
        </div>
      </div>,
    ];
    const renderImgList = (
      list: { url: string; alt: string }[] | undefined
    ) => {
      if (list === undefined) return null;
      const imgElements = (runTime: number) =>
        list.map((img, index) => (
          <Image
            key={`Event--List-${runTime}--Image-${index}`}
            url={img.url}
            alt={img.alt}
            useSkeleton={true}
          />
        ));
      return (
        <div className="Image-List">
          <div
            className="Slider"
            style={{ animationDuration: `${list.length * 2}s` }}
          >
            {imgElements(1)}
            {imgElements(2)}
          </div>
        </div>
      );
    };
    for (let i = 1; i <= lastIndex; i++) {
      listElement.push(
        <div className="Page" key={`Page-${i}`}>
          <div
            className="Container"
            onClick={() => {
              getToEvent(i - 1);
            }}
          >
            <div className="Image">
              <img
                loading="lazy"
                decoding="async"
                data-nimg="1"
                onLoad={() => {
                  setLoadedCounts((prev) => prev + 1);
                }}
                src={DOMAIN + currentSize + list[i].front_face.url}
                alt={list[i].front_face.alt}
              />
            </div>
            <div className="Button">
              <FontAwesomeIcon icon={faShare} flip="horizontal" />
            </div>
          </div>
          <div
            className="Backface"
            onClick={() => {
              getToEvent(i);
            }}
          >
            <div className="Image">
              <img
                loading="lazy"
                decoding="async"
                data-nimg="1"
                onLoad={() => {
                  setLoadedCounts((prev) => prev + 1);
                }}
                src={DOMAIN + currentSize + list[i - 1].back_face.url}
                alt={list[i - 1].back_face.alt}
              />
            </div>
            {i - 1 > 0 ? renderImgList(list[i - 1].img_list) : null}
            <div className="Date">{list[i - 1].date}</div>
            <div className="Button">
              <FontAwesomeIcon icon={faReply} flip="horizontal" />
            </div>
          </div>
        </div>
      );
    }
    listElement.push(
      <div className="Page" key={`Page-${NOW_INDEX}`}>
        <div
          className="Container Cover"
          onClick={() => {
            getToEvent(NOW_INDEX - 1);
          }}
        >
          <img
            loading="lazy"
            decoding="async"
            data-nimg="1"
            onLoad={() => {
              setLoadedCounts((prev) => prev + 1);
            }}
            src={DOMAIN + currentSize + histories_cover.url}
            alt={histories_cover.alt}
          />
          <div className="Title">
            <h1>LỊCH SỬ</h1>
            <h3>The Thousand Beans</h3>
          </div>
        </div>
        <div className="Backface" onClick={getBackNow}>
          <div className="Image">
            <img
              loading="lazy"
              decoding="async"
              data-nimg="1"
              onLoad={() => {
                setLoadedCounts((prev) => prev + 1);
              }}
              src={DOMAIN + currentSize + list[lastIndex].back_face.url}
              alt={list[lastIndex].back_face.alt}
            />
          </div>
          {renderImgList(list[lastIndex].img_list)}
          <div className="Date">{list[lastIndex].date}</div>
          <div className="Button">
            <FontAwesomeIcon icon={faReply} flip="horizontal" />
          </div>
        </div>
      </div>
    );
    return listElement;
  }, [size]);
  const renderPlanPages = useMemo(() => {
    const list = plans;
    const currentSize = size == "O" ? "W" : size;
    const lastIndex = list.length - 1;
    const listElement = [
      <div className="Page" key={`Page-${NOW_INDEX + 1}`}>
        <div className="Container" onClick={getBackNow}>
          <div className="Image">
            <img
              loading="lazy"
              decoding="async"
              data-nimg="1"
              onLoad={() => {
                setLoadedCounts((prev) => prev + 1);
              }}
              src={DOMAIN + currentSize + list[0].front_face.url}
              alt={list[0].front_face.alt}
            />
          </div>
          <div className="Button">
            <FontAwesomeIcon icon={faReply} />
          </div>
        </div>
        <div
          className="Backface Cover"
          onClick={() => {
            getToEvent(NOW_INDEX + 1);
          }}
        >
          <img
            loading="lazy"
            decoding="async"
            data-nimg="1"
            onLoad={() => {
              setLoadedCounts((prev) => prev + 1);
            }}
            src={DOMAIN + currentSize + plan_cover.url}
            alt={plan_cover.alt}
          />
          <div className="Title">
            <h3>The Thousand Beans</h3>
            <h1>PHÁT TRIỂN</h1>
          </div>
        </div>
      </div>,
    ];

    for (let i = 1; i <= lastIndex; i++) {
      const toggleIndex = i + NOW_INDEX + 1;
      listElement.push(
        <div className="Page" key={`Page-${toggleIndex}`}>
          <div
            className="Container"
            onClick={() => {
              getToEvent(toggleIndex - 1);
            }}
          >
            <div className="Image">
              <img
                loading="lazy"
                decoding="async"
                data-nimg="1"
                onLoad={() => {
                  setLoadedCounts((prev) => prev + 1);
                }}
                src={DOMAIN + currentSize + list[i].front_face.url}
                alt={list[i].front_face.alt}
              />
            </div>
            <div className="Button">
              <FontAwesomeIcon icon={faReply} />
            </div>
          </div>
          <div
            className="Backface"
            onClick={() => {
              getToEvent(toggleIndex);
            }}
          >
            <div className="Image">
              <img
                loading="lazy"
                decoding="async"
                data-nimg="1"
                onLoad={() => {
                  setLoadedCounts((prev) => prev + 1);
                }}
                src={DOMAIN + currentSize + list[i - 1].back_face.url}
                alt={list[i - 1].back_face.alt}
              />
            </div>
            <div className="Date">{list[i - 1].date}</div>
            <div className="Button">
              <FontAwesomeIcon icon={faShare} />
            </div>
          </div>
        </div>
      );
    }
    listElement.push(
      <div className="Page" key={`Page-${lastIndex + NOW_INDEX + 2}`}>
        <div className="Backface" onClick={getBackNow}>
          <div className="Image">
            <img
              loading="lazy"
              decoding="async"
              data-nimg="1"
              onLoad={() => {
                setLoadedCounts((prev) => prev + 1);
              }}
              src={DOMAIN + currentSize + list[lastIndex].back_face.url}
              alt={list[lastIndex].back_face.alt}
            />
          </div>
          <div className="Date">{list[lastIndex].date}</div>
          <div className="Button">
            <FontAwesomeIcon icon={faReplyAll} />
          </div>
        </div>
      </div>
    );
    return listElement;
  }, [size]);

  const renderHistoryEvents = useMemo(
    () =>
      histories.map((event, index) =>
        !Array.isArray(event) ? (
          <Event
            className={targetEvent == idList.indexOf(event.id) ? "Active" : ""}
            key={`History-Point-${index}`}
            toggleHandler={() => {
              getToEvent(idList.indexOf(event.id));
            }}
            event={{
              date: event.date || "",
              type: event.type || "",
              title: event.title || "",
              sub_title: event.sub_title,
            }}
          />
        ) : (
          <div className="Period" key={`History-Period-${index}`}>
            {event.map((sub_event, s_index) => (
              <Event
                key={`History-Period-${index}${s_index}`}
                className={
                  targetEvent == idList.indexOf(sub_event.id) ? "Active" : ""
                }
                toggleHandler={() => {
                  getToEvent(idList.indexOf(sub_event.id));
                }}
                event={{
                  date: sub_event.date || "",
                  type: sub_event.type || "",
                  title: sub_event.title || "",
                  sub_title: null,
                }}
              />
            ))}
          </div>
        )
      ),
    [targetEvent]
  );

  const renderPlanEvents = useMemo(
    () =>
      plans.map((event, index) => {
        const post_index = NOW_INDEX + 1 + index;
        return (
          <Event
            className={targetEvent == post_index ? "Active" : ""}
            key={`Plan-Point-${index}`}
            toggleHandler={() => {
              getToEvent(post_index);
            }}
            event={{
              date: event.date || "",
              type: event.type || "",
              title: event.title || "",
              sub_title: event.sub_title,
            }}
          />
        );
      }),
    [targetEvent]
  );
  const renderButton = useMemo(() => {
    return (
      <>
        <div
          className="Left"
          onClick={() => {
            setTargetEvent((prev) => (prev === 0 ? NOW_INDEX : prev - 1));
          }}
        ></div>
        <div
          className="Right"
          onClick={() => {
            setTargetEvent((prev) =>
              prev === LAST_INDEX ? NOW_INDEX : prev + 1
            );
          }}
        ></div>
      </>
    );
  }, []);

  return (
    <div
      className="MS__Container Container"
      data-device={isMobile ? "mobile" : "desktop"}
    >
      <div className={`Books`}>
        <div className="Book">
          <div
            className={`Pages Current-${currentEvent + 1}${
              loading ? " Loading" : ""
            }`}
            style={{ animationPlayState: ms ? "running" : "paused" }}
          >
            {renderHistoryPages}
            {renderPlanPages}
          </div>
        </div>
        {!loading ? renderButton : null}
      </div>
      <div
        className="Line"
        style={{ animationPlayState: ms ? "running" : "paused" }}
      >
        <div className="History Frame">
          {!loading ? renderHistoryEvents : null}
        </div>
        <div
          className={`Now Point ${targetEvent == NOW_INDEX ? "Active" : ""}`}
          onClick={getBackNow}
        >
          <div className="Info">
            <FontAwesomeIcon
              icon={targetEvent == NOW_INDEX ? faClockS : faClockR}
            />
          </div>
          <div className="Time">
            <b>
              {getTimeNow.day}/{getTimeNow.month}/{getTimeNow.year}
            </b>
          </div>

          <div className="Dot"></div>
        </div>
        <div className="Plan Frame">{!loading ? renderPlanEvents : null}</div>
      </div>
    </div>
  );
};

export default Milestone;
