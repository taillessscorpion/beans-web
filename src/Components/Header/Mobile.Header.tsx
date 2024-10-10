"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import React, { useEffect, useState } from "react";
import { logo_square } from "@/util/ImageLink.util";
import Copyright from "../Copyright";
import "@/app/Assets/Header/mobile.Header.scss";

const MobileHeader = () => {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isAtBot, setIsAtBot] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<boolean>(false);

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
      <header data-device="mobile">
        <div
          className={`Container ${isAtTop ? "Fade" : ""} ${
            isAtBot ? "Mini" : ""
          }`}
        >
          <div
            className={`Navigation ${menuActive ? "Active" : ""}`}
            onClick={() => {
              setMenuActive(!menuActive);
            }}
          >
            <div></div>
          </div>
          <div className="Logo">
            <Link href="/">
              <img
                decoding="async"
                data-nimg="1"
                src={logo_square.url}
                alt=""
              />
            </Link>
          </div>
          <div className="Cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </header>
      <div className={`Menu ${menuActive ? "Active" : ""}`}>
        <Link href="/thousand-beans">NGÀN HẠT</Link>
        <Link href="/thousand-stories">NGÀN CÂU CHUYỆN</Link>
        <Link href="/thousand-stores">NGÀN CỬA HÀNG</Link>
        <Link href="/thousand-products">NGÀN SẢN PHẨM</Link>
      </div>
      <Copyright className={isAtBot ? "Active" : ""} />
    </>
  );
};

export default MobileHeader;
