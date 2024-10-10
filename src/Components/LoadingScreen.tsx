import { logo_square } from "@/util/ImageLink.util";

const LoadingScreen = () => {
  return (
    <div className="Loading-Screen">
      <div className="Logo">
        <img
          decoding="async"
          data-nimg="1"
          src={logo_square.url}
          alt="The Thousand Beans LOGO"
        />
        <div className="Shadow"></div>
      </div>
      <h1>
        <span>&quot; </span>
        <span>From </span>
        <span className="Farm">farm </span>
        <span>to </span>
        <span className="Cup">cup </span>
        <span>&quot; </span>
      </h1>
    </div>
  );
};

export default LoadingScreen;
