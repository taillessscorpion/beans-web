"use client"
import dynamic from "next/dynamic";
import { blog } from "../app/fixed-data";
import { isMobile } from "react-device-detect";
const Blog = dynamic(() => import("./Presentation/Blog.Presentation"), { ssr: false });


const Story = () => {
  const renderBlog = () => {
    const listEl = [];
    for (let i = 0; i < 6; i++) {
      if (blog[i]) {
        const { thumbnail, date, author, content, title, url } = blog[i];
        listEl.push(
          <Blog key={`Blog-${i} `}{...{ thumbnail, date, author, content, title, url }} />
        );
      }
    }
    return listEl;
  };
  return <div className="S__Container Container" data-device={isMobile ? "mobile" : "desktop"}>{renderBlog()}</div>;
};

export default Story;
