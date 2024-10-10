import Link from "next/link";

const Copyright = ({ className = "" }: { className: string }) => {
  return (
    <div className={`Copyright ${className}`}>
      <div className="Container">
        <div>
          <span>Copyright © 2024 </span>
          <span>The Thousand Beans, All Rights Reserved!</span>
        </div>
        <div>
          <span>Established in 2023 by </span>
          <Link
            href="https://thethousandgroup.com.vn/"
            target="_blank"
            className="Link-As-Text"
          >
            The Thousand Group
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
