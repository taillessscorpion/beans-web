import Link from "next/link";

interface Links {
  header: string;
  type: string;
  list: { url: string; content: string }[];
}
interface Props {
  links: Links;
}

const LinkList = ({ links }: Props) => {
  const { header, type, list } = links;
  return (
    <div>
      <h2>{header}</h2>
      <ul>
        {list.map((link, index) => (
          <li key={`Footer-Header-${index}`}>
            <Link href={link.url} target={type === "internal" ? "" : "_blank"}>
              {link.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
