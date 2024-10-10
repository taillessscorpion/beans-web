import { createContext } from "react";

interface ScreenSizeInterface {
  size: string;
}
const ScreenSizeContext = createContext<ScreenSizeInterface>({ size: "S" });

export default ScreenSizeContext;
