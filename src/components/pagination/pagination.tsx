import { ReactNode, MouseEvent } from 'react';
import { CATALOG_PAGE_QUERY } from '../../const';

type PaginationProps = {
  productsTotalCount: number;
  productsPerPageCount: number;
  currentPage: number;
  onSetCurrentPage: (page: number) => void;
  onSetStartItemNumber: (startItemNumber: number) => void;
  onSetSearchParams: (params: string) => void;
};

function Pagination(props: PaginationProps): JSX.Element {
  const {productsTotalCount, productsPerPageCount, currentPage, onSetCurrentPage} = props;
  const {onSetStartItemNumber, onSetSearchParams} = props;
  const paginationList: ReactNode[] = [];

  const updateCatalog = (newPage: number) => {
    const startItemNumber = (newPage - 1) * productsPerPageCount;

    onSetSearchParams(`${CATALOG_PAGE_QUERY}=${newPage}`);
    onSetCurrentPage(newPage);
    onSetStartItemNumber(startItemNumber);

    document.querySelector('.catalog')?.scrollIntoView();
  };

  const handlePrevButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(currentPage - 1);
  };

  const handleNextButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(currentPage + 1);
  };

  const handlePageNumberButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    updateCatalog(Number(evt.currentTarget.textContent));
  };

  const getPaginationList = () => {
    const pagesCount = Math.ceil(productsTotalCount / productsPerPageCount);

    for (let i = 0; i < pagesCount; i++) {
      const pageNumber = String(i + 1);

      paginationList.push(
        <li className="pagination__item" key={pageNumber} data-testid="pagination-item">
          <a
            onClick={handlePageNumberButtonClick}
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
        {currentPage > 1 && productsTotalCount > 0 &&
        <li className="pagination__item">
          <a
            onClick={handlePrevButtonClick}
            className="pagination__link pagination__link--text"
            href="2"
          >
            Назад
          </a>
        </li>}

        {getPaginationList()}

        {currentPage < paginationList.length &&
        <li className="pagination__item">
          <a
            onClick={handleNextButtonClick}
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
