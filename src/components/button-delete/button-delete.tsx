import "./button-delete.css";

type Props = {
  text: string;
};

export function ButtonDelete({ text }: Props) {
  return (
    <button className="button-delete" type="button">
      {text}
    </button>
  );
}
