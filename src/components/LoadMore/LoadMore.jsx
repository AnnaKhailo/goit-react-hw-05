import css from "./LoadMore.module.css";

export default function LoadMoreBtn({ onLoadMore }) {
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      Load more
    </button>
  );
}
