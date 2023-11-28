import PropTypes from "prop-types";
import "./button-delete.css";

type Props = {
  text: string;
  onDelete(): void;
};

export function ButtonDelete({ text, onDelete }: Props) {
  return (
    <button className="button-delete" type="button" onClick={onDelete}>
      {text}
    </button>
  );
}

ButtonDelete.protoTypes = {
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
