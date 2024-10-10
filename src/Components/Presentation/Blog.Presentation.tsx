import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons/faPenClip";
import Image from "../Thumb/Image.Thumb";

const Blog = ({
  thumbnail,
  date,
  author,
  title,
  content,
  url,
}: {
  thumbnail: string;
  date: string;
  author: string;
  title: string;
  content: string;
  url: string;
}) => {
  return (
    <div className="Blog">
      <div className="Image">
        <Image url={thumbnail} alt={"Ảnh minh họa của " + title} useResize={false} useOversize={true} useIndicator={true} />
        <div className="Time">
          <p>{date}</p>
        </div>
      </div>
      <div className="Info">
        <div className="Title">
          <h2>{title}</h2>
        </div>
        <div className="Detail">
          <div className="Author">
            <FontAwesomeIcon icon={faPenClip} />
            <b>{author}</b>
          </div>
          <div className="Content">
            <i className="Text">
              <span>{content}</span>
            </i>
            <div className="Cover">Xem chi tiết</div>
          </div>
        </div>
      </div>
      <Link href={url}></Link>
    </div>
  );
};

export default Blog;
