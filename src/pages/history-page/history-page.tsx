import "./history-page.css";
import { ButtonDelete } from "../../components/button-delete/button-delete";
import { HistoryItem } from "../../components/history-item/history-item";
import { HistoryList } from "../../components/history-list/history-list";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { cleanHistory } from "../../redux/user-login-slice";

export default function HistoryPage() {
  const historyLinksArr =
    useAppSelector((state) => state.currentUser.user?.searchHistory) ?? [];
  const dispatch = useAppDispatch();

  function cleanSearchHistory() {
    dispatch(cleanHistory());
  }

  return (
    <>
      {historyLinksArr.length > 0 ? (
        <>
          <div className="history-container">
            <ButtonDelete
              text="Очистить историю"
              onDelete={cleanSearchHistory}
            />
          </div>
          <HistoryList>
            {historyLinksArr.map(({ id, bookName }) => (
              <HistoryItem key={id} linkId={id} bookName={bookName} />
            ))}
          </HistoryList>
        </>
      ) : (
        <p className="history-text">История поиска пуста</p>
      )}
    </>
  );
}
