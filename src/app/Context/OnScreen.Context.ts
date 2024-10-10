import { createContext } from "react";

interface OnScreenInterface {
  intro?: boolean;
  rm?: boolean;
  ms?: boolean;
  slider?: boolean;
}
const OnScreenContext = createContext<OnScreenInterface | null>(null);

export default OnScreenContext;
