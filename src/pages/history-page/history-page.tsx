import { ButtonDelete } from "../../components/button-delete/button-delete";
import { HistoryItem } from "../../components/history-item/history-item";
import { HistoryList } from "../../components/history-list/history-list";

export function HistoryPage() {
  return (
    <>
      <ButtonDelete text="Очистить историю" />
      <HistoryList>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
      </HistoryList>
    </>
  );
}
