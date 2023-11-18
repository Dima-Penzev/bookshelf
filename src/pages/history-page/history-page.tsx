import "./history-page.css";
import { ButtonDelete } from "../../components/button-delete/button-delete";
import { HistoryItem } from "../../components/history-item/history-item";
import { HistoryList } from "../../components/history-list/history-list";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { cleanHistory } from "../../redux/search-history-slice";

export function HistoryPage() {
  const historyLinksArr = useAppSelector((state) => state.searchHistory.value);
  const currentUserId = useAppSelector((state) => state.currentUser.user?.id);
  const dispatch = useAppDispatch();
  const ownLinksArr = historyLinksArr.filter(
    ({ userId }) => userId === currentUserId
  );

  function cleanSearchHistory() {
    dispatch(cleanHistory(currentUserId));
  }

  return (
    <>
      {ownLinksArr.length > 0 ? (
        <>
          <div className="history-container">
            <ButtonDelete
              text="Очистить историю"
              onDelete={cleanSearchHistory}
            />
          </div>
          <HistoryList>
            {ownLinksArr.map(({ id, bookName }) => (
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
