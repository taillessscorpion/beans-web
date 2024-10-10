import { useEffect, useState } from "react";

const useLoadImage = (src: string) => {
const [currentSrc, setCurrentSrc] = useState<string>("")
  const [loadedSrc, setLoadedSrc] = useState<string>("");
  useEffect(()=>{
    if(src === currentSrc) return
    setCurrentSrc(src)
  }, [src])
  useEffect(() => {
    const img = new Image();
    img.src = currentSrc;
    img.onload = () => {
      setLoadedSrc(currentSrc);
    };
  }, [currentSrc]);
  return loadedSrc;
};

export default useLoadImage
