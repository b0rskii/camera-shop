import { ReactNode, MouseEvent } from 'react';
import { CARDS_PER_PAGE_COUNT, CATALOG_PAGE_QUERY } from '../../const';

type PaginationProps = {
  productsTotalCount: number;
  currentPage: number;
  onSetCurrentPage: (page: number) => void;
  onSetStartItemNumber: (startItemNumber: number) => void;
  onSetSearchParams: (params: string) => void;
};

function Pagination(props: PaginationProps): JSX.Element {
  const {productsTotalCount, currentPage, onSetCurrentPage} = props;
  const {onSetStartItemNumber, onSetSearchParams} = props;
  const paginationList: ReactNode[] = [];

  const updateCatalog = (newPage: number) => {
    const startItemNumber = (newPage - 1) * CARDS_PER_PAGE_COUNT;

    onSetSearchParams(`${CATALOG_PAGE_QUERY}=${newPage}`);
    onSetCurrentPage(newPage);
    onSetStartItemNumber(startItemNumber);

    document.querySelector('.catalog')?.scrollIntoView();
  };

  const prevButtonClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(currentPage - 1);
  };

  const nextButtonClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(currentPage + 1);
  };

  const pageNumberButtonClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(Number(evt.currentTarget.textContent));
  };

  const getPaginationList = () => {
    const pagesCount = Math.ceil(productsTotalCount / CARDS_PER_PAGE_COUNT);

    for (let i = 0; i < pagesCount; i++) {
      const pageNumber = String(i + 1);

      paginationList.push(
        <li className="pagination__item" key={pageNumber}>
          <a
            onClick={pageNumberButtonClickHandler}
            className={`pagination__link ${Number(pageNumber) === currentPage ? 'pagination__link--active' : ''}`}
            href={pageNumber}
          >
            {pageNumber}
          </a>
        </li>
      );
    }

    return paginationList;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
        <li className="pagination__item">
          <a
            onClick={prevButtonClickHandler}
            className="pagination__link pagination__link--text"
            href="2"
          >
            Назад
          </a>
        </li>}

        {getPaginationList()}

        {currentPage !== paginationList.length &&
        <li className="pagination__item">
          <a
            onClick={nextButtonClickHandler}
            className="pagination__link pagination__link--text"
            href="2"
          >
            Далее
          </a>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
