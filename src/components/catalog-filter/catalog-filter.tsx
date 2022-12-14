import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getCatalogFilterMinPrice,
  getCatalogFilterMaxPrice,
  getCatalogFilterCategory,
  getCatalogFilterLevel,
  getCatalogFilterType,
  getCatalogFilterNearestMinPrice,
  getCatalogFilterNearestMaxPrice,
  getCatalogFilterMinPriceLimit,
  getCatalogFilterMaxPriceLimit
} from '../../store/catalog-filter-slice/selectors';
import {
  catalogFilterMinPriceUpdate,
  catalogFilterMaxPriceUpdate,
  catalogFilterCategoryUpdate,
  catalogFilterLevelUpdate,
  catalogFilterReset,
  catalogFilterTypeUpdate,
} from '../../store/catalog-filter-slice/catalog-filter-slice';
import { AppQuery, InitialCatalogPriceLimit } from '../../const';
import PriceFilter from '../filters/price-filter/price-filter';
import CheckBoxFilter from '../filters/check-box-filter/check-box-filter';

const CategoryFilter = {
  Name: AppQuery.CatalogCategoryFilter,
  Title: 'Категория',
  Values: [
    {
      Name: 'photocamera',
      Title: 'Фотоаппарат',
      DisableFilter: null,
    },
    {
      Name: 'videocamera',
      Title: 'Видеокамера',
      DisableFilter: null,
    },
  ],
};

const TypeFilter = {
  Name: AppQuery.CatalogTypeFilter,
  Title: 'Тип камеры',
  Values: [
    {
      Name: 'digital',
      Title: 'Цифровая',
      DisableFilter: null,
    },
    {
      Name: 'film',
      Title: 'Плёночная',
      DisableFilter: 'Видеокамера',
    },
    {
      Name: 'snapshot',
      Title: 'Моментальная',
      DisableFilter: 'Видеокамера',
    },
    {
      Name: 'collection',
      Title: 'Коллекционная',
      DisableFilter: null,
    },
  ],
};

const LevelFilter = {
  Name: AppQuery.CatalogLevelFilter,
  Title: 'Уровень',
  Values: [
    {
      Name: 'zero',
      Title: 'Нулевой',
      DisableFilter: null,
    },
    {
      Name: 'non-professional',
      Title: 'Любительский',
      DisableFilter: null,
    },
    {
      Name: 'professional',
      Title: 'Профессиональный',
      DisableFilter: null,
    },
  ],
};

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const minPrice = useAppSelector(getCatalogFilterMinPrice);
  const maxPrice = useAppSelector(getCatalogFilterMaxPrice);
  const minPriceLimit = useAppSelector(getCatalogFilterMinPriceLimit);
  const maxPriceLimit = useAppSelector(getCatalogFilterMaxPriceLimit);
  const category = useAppSelector(getCatalogFilterCategory);
  const type = useAppSelector(getCatalogFilterType);
  const level = useAppSelector(getCatalogFilterLevel);
  const nearestMinPrice = useAppSelector(getCatalogFilterNearestMinPrice);
  const nearestMaxPrice = useAppSelector(getCatalogFilterNearestMaxPrice);

  const setMinPrice = useCallback(
    (value: string | null) => dispatch(catalogFilterMinPriceUpdate(value)),
    [dispatch]
  );

  const setMaxPrice = useCallback(
    (value: string | null) => dispatch(catalogFilterMaxPriceUpdate(value)),
    [dispatch]
  );

  const setCategoryFilter = useCallback(
    (filter: string) => dispatch(catalogFilterCategoryUpdate(filter)),
    [dispatch]
  );

  const setTypeFilter = useCallback(
    (filter: string) => dispatch(catalogFilterTypeUpdate(filter)),
    [dispatch]
  );

  const setLevelFilter = useCallback(
    (filter: string) => dispatch(catalogFilterLevelUpdate(filter)),
    [dispatch]
  );

  const handleResetButtonClick = () => {
    dispatch(catalogFilterReset());
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          minPriceLimit={minPriceLimit === InitialCatalogPriceLimit.Min ? null : minPriceLimit.toString()}
          maxPriceLimit={maxPriceLimit === InitialCatalogPriceLimit.Max ? null : maxPriceLimit.toString()}
          nearestMinPrice={nearestMinPrice}
          nearestMaxPrice={nearestMaxPrice}
          onMinPriceUpdate={setMinPrice}
          onMaxPriceUpdate={setMaxPrice}
        />
        <CheckBoxFilter
          title={CategoryFilter.Title}
          values={CategoryFilter.Values}
          filterData={category}
          onFilterChange={setCategoryFilter}
        />
        <CheckBoxFilter
          title={TypeFilter.Title}
          values={TypeFilter.Values}
          filterData={type}
          onFilterChange={setTypeFilter}
          extraData={category}
        />
        <CheckBoxFilter
          title={LevelFilter.Title}
          values={LevelFilter.Values}
          filterData={level}
          onFilterChange={setLevelFilter}
        />
        <button
          onClick={handleResetButtonClick}
          className="btn catalog-filter__reset-btn"
          type="button"
          disabled={!minPrice && !maxPrice && !category.length && !type.length && !level.length}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
