import { useContext, useState } from "react";
import Indicator from "./LoadingIndicator";
import ScreenSizeContext from "@/app/Context/ScreenSize.Context";
import dynamic from "next/dynamic";
const Skeleton = dynamic(import("./LoadingSkeleton"));

const Image = ({
  url,
  alt,
  lazyLoad = true,
  useResize = true,
  useOversize,
  useIndicator,
  useSkeleton,
}: {
  url: string;
  alt: string;
  lazyLoad?: boolean | undefined;
  useResize?: boolean | undefined;
  useOversize?: boolean | undefined;
  useIndicator?: boolean | undefined;
  useSkeleton?: boolean | undefined;
}) => {
  const { size } = useContext(ScreenSizeContext);
  const [loading, setLoading] = useState<boolean>(true);
  const domain = process.env.S3_URL || "";
  const src =
    domain +
    (!useResize ? "O" : !useOversize && size == "O" ? "W" : size) +
    url;

  return (
    <div className="Image-Thumb">
      <img
        onLoad={() => {
          setLoading(false);
        }}
        loading={lazyLoad ? "lazy" : "eager"}
        src={src}
        alt={alt}
        decoding="async"
        data-nimg="1"
      />
      {loading && useIndicator ? <Indicator /> : null}
      {loading && useSkeleton ? <Skeleton /> : null}
    </div>
  );
};

export default Image;
