"use client";
import { useCallback, useEffect, useState } from "react";

import SingleCarousel from "@/Components/Carousel/Single.Carousel";
const Introduction = dynamic(() => import("@/Components/Introduction"), {
  ssr: false,
});

const Story = dynamic(() => import("@/Components/Story"), { ssr: false });
const Products = dynamic(() => import("@/Components/Products"), { ssr: false });
const ListRawMaterialAreas = dynamic(
  () => import("@/Components/Presentation/ListRawMaterialAreas"),
  { ssr: false }
);
const Milestone = dynamic(() => import("@/Components/Milestone"), {
  ssr: false,
});

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faPeopleRoof,
  faTags,
  faTractor,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import LoadingScreen from "@/Components/LoadingScreen";
import ScreenSizeContext from "./Context/ScreenSize.Context";
import OnScreenContext from "./Context/OnScreen.Context";

const SIZES = ["S", "M", "W", "O"];
interface ON_SCREEN_INTERFACE {
  intro: boolean;
  rm: boolean;
  ms: boolean;
  slider: boolean;
}
const Home = () => {
  const [loadingIntro, setLoadingIntro] = useState<boolean>(true);
  const [size, setSize] = useState<string>("S");
  const [onScreens, setOnScreens] = useState<ON_SCREEN_INTERFACE>({
    intro: true,
    rm: true,
    ms: true,
    slider: true,
  });
  const [startAt] = useState<number>(Date.now());

  const loadIntroHandler = useCallback(() => {
    const loadingTime = Date.now() - startAt;
    if (loadingTime >= 3500) {
      setLoadingIntro(false);
      return;
    }
    setTimeout(loadIntroHandler, 2000 - loadingTime);
  }, [startAt]);
  useEffect(() => {
    const changeSize = () => {
      const width = window.innerWidth;
      let currentSize = "S";
      if (width > 480) currentSize = "M";
      if (width > 780) currentSize = "W";
      if (width > 1400) currentSize = "O";
      if (SIZES.indexOf(currentSize) > SIZES.indexOf(size))
        setSize(currentSize);
    };
    window.addEventListener("resize", changeSize);

    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, [size]);
  useEffect(() => {
    const getOnScreen = () => {
      const home = document.getElementsByClassName("Home")[0];
      const homeChildren = home.children;
      const height = window.innerHeight;
      const intro = homeChildren[0].getBoundingClientRect();
      const rm = homeChildren[2].getBoundingClientRect();
      const ms = homeChildren[4].getBoundingClientRect();
      const slider = homeChildren[9].getBoundingClientRect();
      setOnScreens({
        intro: intro.bottom >= 0,
        rm: rm.bottom >= 0 && rm.top < height,
        ms: ms.bottom >= 0 && ms.top < height,
        slider: slider.bottom >= 0 && slider.top < height,
      })
    };
    window.addEventListener("scrollend", getOnScreen);
    const width = window.innerWidth;
    if (width <= 480) return setSize("S");
    if (width <= 780) return setSize("M");
    if (width <= 1400) return setSize("W");
    setSize("O");
    return () => {
      window.removeEventListener("scrollend", getOnScreen);
    };
  }, []);

  return (
    <>
      <div className="Home">
        <OnScreenContext.Provider value={onScreens}>
          <ScreenSizeContext.Provider value={{ size }}>
            <Introduction loadHandler={loadIntroHandler} />
            <Link href="/thousand-beans">
              <FontAwesomeIcon icon={faTractor} />
              <h1>NGÀN HẠT</h1>
            </Link>
            <ListRawMaterialAreas />
            <Link href="/thousand-stores">
              <FontAwesomeIcon icon={faPeopleRoof} />
              <h1>NGÀN CỬA HÀNG</h1>
            </Link>
            <Milestone />
            <Link href="/thousand-products">
              <FontAwesomeIcon icon={faTags} />
              <h1>NGÀN SẢN PHẨM</h1>
            </Link>
            <Products />
            <Link href="/thousand-stories">
              <FontAwesomeIcon icon={faBookBookmark} />
              <h1>NGÀN CÂU CHUYỆN</h1>
            </Link>
            <Story />
            <SingleCarousel className="B__Container Container" />
          </ScreenSizeContext.Provider>
        </OnScreenContext.Provider>
      </div>
      {loadingIntro ? <LoadingScreen /> : null}
    </>
  );
};

export default Home;
