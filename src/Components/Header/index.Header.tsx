"use client";

import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";

const MobileHeader = dynamic(() => import("./Mobile.Header"), { ssr: false });
const DesktopHeader = dynamic(() => import("./Desktop.Header"), { ssr: false });

const Header = () => {
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
