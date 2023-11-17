import "./history-list.css";

type Props = {
  children: JSX.Element[];
};
export function HistoryList({ children }: Props): JSX.Element {
  return <ul className="list">{children}</ul>;
}
