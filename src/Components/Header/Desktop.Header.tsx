"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import React, { useEffect, useState } from "react";
import { logo_square } from "@/util/ImageLink.util";
import Copyright from "../Copyright";
import "@/app/Assets/Header/desktop.Header.scss";

const DesktopHeader = () => {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isAtBot, setIsAtBot] = useState<boolean>(false);

  useEffect(() => {
    document?.addEventListener("scroll", () => {
      const bodyHeight = window.document.body.offsetHeight;
      const viewportHeight = window.visualViewport?.height || 0;
      const viewportScroll = window.visualViewport?.pageTop || 0;
      const footerHeight =
        document.getElementsByTagName("footer")[0]?.offsetHeight || 0;
      if (bodyHeight - footerHeight - viewportHeight <= viewportScroll) {
        setIsAtBot(true);
      } else {
        setIsAtBot(false);
      }
      if (viewportScroll != 0) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    });
  }, []);
  return (
    <>
      <header data-device="desktop">
        <div
          className={`Container ${isAtTop ? "Fade" : ""} ${
            isAtBot ? "Mini" : ""
          }`}
        >
          <div className="Navigation">
            <Link href="/">
              <img

                decoding="async"
                data-nimg="1"
                src={logo_square.url}
                alt=""
              />
            </Link>
            <Link href="/thousand-beans">NGÀN HẠT</Link>
            <Link href="/thousand-stories">NGÀN CÂU CHUYỆN</Link>
            <Link href="/thousand-stores">NGÀN CỬA HÀNG</Link>
            <Link href="/thousand-products">NGÀN SẢN PHẨM</Link>
          </div>
          <div className="Cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </header>
      <Copyright className={isAtBot ? "Active" : ""} />
    </>
  );
};

export default DesktopHeader;
