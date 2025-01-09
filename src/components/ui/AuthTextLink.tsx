import { Link } from "react-router-dom";

type AuthTextLinkProps = {
  text: string;
  path: string;
  title: string;
};

export default function AuthTextLink({ text, title, path }: AuthTextLinkProps) {
  return (
    <div style={{ textAlign: "center", paddingTop: "30px" }}>
      <span>{text}</span> <Link to={path}>{title}</Link>
    </div>
  );
}
