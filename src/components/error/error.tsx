import "./error.css";

type Props = {
  text: string;
};

export function Error({ text }: Props) {
  return <p className="error">{text}</p>;
}
