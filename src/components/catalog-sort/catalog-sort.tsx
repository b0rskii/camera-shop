import { useEffect, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCatalogSort } from '../../store/catalog-sort-slice/selectors';
import { catalogSortUpdate } from '../../store/catalog-sort-slice/catalog-sort-slice';
import { AppQuery } from '../../const';

const SortType = {
  Price: {
    Id: 'sortPrice',
    Title: 'по цене',
    Value: 'price',
  },
  Popular: {
    Id: 'sortPopular',
    Title: 'по популярности',
    Value: 'rating',
  },
};

const SortOrder = {
  Ascending: {
    Id: 'up',
    Title: 'По возрастанию',
    Value: 'asc',
  },
  Descending: {
    Id: 'down',
    Title: 'По убыванию',
    Value: 'desc',
  },
};

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const {sort, order} = useAppSelector(getCatalogSort);

  useEffect(() => {
    setSearchParams((params) => {
      if (sort) {
        params.set(AppQuery.CatalogSort, sort);
      }
      if (order) {
        params.set(AppQuery.CatalogSortOrder, order);
      }
      return params;
    });
  }, [setSearchParams, sort, order]);

  const updateSort = (sortBy: string, sortOrder: string) => {
    dispatch(catalogSortUpdate({
      sort: sortBy,
      order: sortOrder,
    }));
  };

  const handleSortTypeChange = (sortBy: string) => {
    const sortOrder = order ? order : SortOrder.Ascending.Value;
    updateSort(sortBy, sortOrder);
  };

  const handleSortOrderChange = (sortOrder: string) => {
    const sortBy = sort ? sort : SortType.Price.Value;
    updateSort(sortBy, sortOrder);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.values(SortType).map((sortType) => (
              <div
                className="catalog-sort__btn-text"
                key={sortType.Id}
              >
                <input
                  onChange={() => handleSortTypeChange(sortType.Value)}
                  type="radio"
                  id={sortType.Id}
                  name="sort"
                  checked={sort === sortType.Value}
                  data-testid={sortType.Title}
                />
                <label htmlFor={sortType.Id}>{sortType.Title}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {Object.values(SortOrder).map((sortOrder) => (
              <div key={sortOrder.Id} className={`catalog-sort__btn catalog-sort__btn--${sortOrder.Id}`}>
                <input
                  onChange={() => handleSortOrderChange(sortOrder.Value)}
                  type="radio"
                  id={sortOrder.Id}
                  name="sort-icon"
                  aria-label={sortOrder.Title}
                  checked={order === sortOrder.Value}
                  data-testid={sortOrder.Title}
                />
                <label htmlFor={sortOrder.Id}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(CatalogSort);
