"use client";
import OnScreenContext from "@/app/Context/OnScreen.Context";
import ScreenSizeContext from "@/app/Context/ScreenSize.Context";
import { introduction } from "@/app/fixed-data";
import { useContext, useEffect, useState } from "react";

const IMG_COUNTS = 23;

const Introduction = ({ loadHandler }: { loadHandler: () => void }) => {
  const [isFirstAttempt, setIsFirstAttempt] = useState<boolean>(true)
  const [current, setCurrent] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const { size } = useContext(ScreenSizeContext);
  const {intro} = useContext(OnScreenContext) || {intro: true};


  useEffect(() => {
    if(!intro) return 
    const firstRun = setTimeout(() => {
      if(isFirstAttempt) setIsFirstAttempt(false)
      setCurrent(prev => isFirstAttempt ? 1 : prev + 1 < introduction.length ? prev + 1 : 0);
    }, isFirstAttempt ? 3500 : 0);
    const auto = setInterval(() => {
      setCurrent((prev) => (prev + 1 < introduction.length ? prev + 1 : 0));
    }, 6500);
    return () => {
      clearTimeout(firstRun);
      clearInterval(auto);
    };
  }, [intro]);

  useEffect(() => {
    if (loadedImages < IMG_COUNTS) return;
    loadHandler();
  }, [loadedImages]);

  return (
    <div className="Introduction">
      {introduction.map((screen, index) => (
        <div
          className={`Screen ${current === index ? "Active" : ""}`}
          key={`Intro-Screen-${index}`}
        >
          <div className="Container">
            <div className="Background">
              {screen.backgrounds.map((bg, bIndex) => (
                <div key={`Intro-Screen-${index}-Bg-${bIndex}`}>
                  {bg === null ? (
                    ""
                  ) : (
                    <img
                      onLoad={() => {
                        setLoadedImages((prev) => prev + 1);
                      }}
                      decoding="async"
                      data-nimg="1"
                      src={
                        process.env.S3_URL + (size != "O" ? size : "M") + bg.url
                      }
                      alt={bg.alt}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="Hands">
              {screen.hands.map((img, iIndex) => (
                <img
                  onLoad={() => {
                    setLoadedImages((prev) => prev + 1);
                  }}
                  decoding="async"
                  data-nimg="1"
                  src={
                    process.env.S3_URL + (size != "O" ? size : "M") + img.url
                  }
                  alt={img.alt}
                  key={`Intro-Screen-${index}-Hand-${iIndex}`}
                />
              ))}
            </div>
            {screen.object && screen.object.length > 0 ? (
              <div className="Object">
                {screen.object.map((part, pIndex) => (
                  <img
                    onLoad={() => {
                      setLoadedImages((prev) => prev + 1);
                    }}
                    decoding="async"
                    data-nimg="1"
                    key={`Intro-Screen-${index}-Object-${pIndex}`}
                    src={
                      process.env.S3_URL + (size != "O" ? size : "M") + part.url
                    }
                    alt={part.url}
                    width={part.width}
                    height={part.height}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="Wrapper">
              <div className="Container">
                <h1>{screen.titles[0]}</h1>
                <div>
                  <div>
                    <div></div>
                    <h3>{screen.titles[1]}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Introduction;
