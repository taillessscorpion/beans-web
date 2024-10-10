"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "../Thumb/Image.Thumb";
import OnScreenContext from "@/app/Context/OnScreen.Context";

const Store = React.memo(() => (
  <div key="Vision">
    <Image url={"/landing--slider--1.jpg"} alt="Tầm nhìn" useSkeleton={true} />
  </div>
));
Store.displayName = "Store";
const Bag = React.memo(() => (
  <div key={"About-us"}>
    <Image
      url={"/landing--slider--2.png"}
      alt="Về chúng tôi"
      useSkeleton={true}
    />
  </div>
));
Bag.displayName = "Bag";
const children = [<Bag key="Bag" />, <Store key="Store" />];

const SingleCarousel = ({ className }: { className: string }) => {
  const [current, setCurrent] = useState<number>(0);
  const [next, setNext] = useState<number | null>(null);
  const { slider } = useContext(OnScreenContext) || { slider: true };

  useEffect(() => {
    if(!slider) return
    const auto = setTimeout(() => {
      setNext(current < children.length ? current + 1 : 0);
    }, 2000);
    return () => {
      clearTimeout(auto);
    };
  }, [current, slider]);

  return (
    <div className={className}>
      <div
        className={`Slider ${next != null ? "Active" : ""}`}
        style={{
          transform: `translateX(-${
            (100 * (next != null ? next : current)) / (children.length + 1)
          }%)`,
          transition: next != null ? "transform 0.8s ease-out" : "none",
        }}
        onTransitionEnd={() => {
          if (next == null) return;
          setCurrent(next < children.length ? next : 0);
          setNext(null);
        }}
      >
        {children}
        {<Bag />}
      </div>
      <div className="Dots">
        {children.map((child, index) => (
          <div
            className={`Dot ${
              next != null
                ? index == next
                  ? "Active"
                  : ""
                : index == current
                ? "Active"
                : ""
            }`}
            key={`Dot-${index}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SingleCarousel;
