import { Link } from "react-router-dom";
import { ButtonDelete } from "../button-delete/button-delete";
import "./history-item.css";

export function HistoryItem() {
  return (
    <li className="item">
      <Link className="item__link" to="/">
        link to book list
      </Link>
      <ButtonDelete text="Удалить" />
    </li>
  );
}
