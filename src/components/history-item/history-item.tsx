import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./history-item.css";
import { ButtonDelete } from "../button-delete/button-delete";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeLink } from "../../redux/user-login-slice";

type Props = {
  linkId?: string;
  bookName: string;
};

export function HistoryItem({ linkId, bookName }: Props) {
  const dispatch = useAppDispatch();

  function removeSearchLink() {
    dispatch(removeLink(linkId || ""));
  }

  return (
    <li className="item">
      <Link className="item__link" to={`/search/${bookName}`}>
        {bookName}
      </Link>
      <ButtonDelete text="Удалить" onDelete={removeSearchLink} />
    </li>
  );
}

HistoryItem.propType = {
  linkId: PropTypes.string.isRequired,
  bookName: PropTypes.string.isRequired,
};
