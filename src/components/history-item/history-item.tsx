import { Link } from "react-router-dom";
import { ButtonDelete } from "../button-delete/button-delete";
import "./history-item.css";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeLink } from "../../redux/user-login-slice";

type Props = {
  linkId?: string;
  bookName: string;
};

export function HistoryItem({ linkId, bookName }: Props) {
  const dispatch = useAppDispatch();

  function removeSearchLink() {
    dispatch(removeLink(linkId));
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
