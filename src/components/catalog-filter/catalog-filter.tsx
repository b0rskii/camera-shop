import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getCatalogFilterCategory,
  getCatalogFilterLevel,
  getCatalogFilterType
} from '../../store/catalog-filter-slice/selectors';
import {
  catalogFilterCategoryUpdate,
  catalogFilterLevelUpdate,
  catalogFilterReset,
  catalogFilterTypeUpdate,
} from '../../store/catalog-filter-slice/catalog-filter-slice';
import { AppQuery } from '../../const';
import PriceFilter from '../filters/price-filter/price-filter';
import CheckBoxFilter from '../filters/check-box-filter/check-box-filter';

const CategoryFilter = {
  Name: AppQuery.CatalogCategoryFilter,
  Title: 'Категория',
  Filters: [
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
  Filters: [
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
  Filters: [
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
  const [, setSearchParams] = useSearchParams();

  const category = useAppSelector(getCatalogFilterCategory);
  const type = useAppSelector(getCatalogFilterType);
  const level = useAppSelector(getCatalogFilterLevel);

  useEffect(() => {
    setSearchParams((params) => {
      params.delete(AppQuery.CatalogCategoryFilter);
      category.forEach((item) => {
        params.append(AppQuery.CatalogCategoryFilter, item);
      });

      params.delete(AppQuery.CatalogTypeFilter);
      type.forEach((item) => {
        params.append(AppQuery.CatalogTypeFilter, item);
      });

      params.delete(AppQuery.CatalogLevelFilter);
      level.forEach((item) => {
        params.append(AppQuery.CatalogLevelFilter, item);
      });

      return params;
    });
  }, [setSearchParams, category, type, level]);

  const handleCategoryFilterChange = (filter: string) => {
    dispatch(catalogFilterCategoryUpdate(filter));
  };

  const handleTypeFilterChange = (filter: string) => {
    dispatch(catalogFilterTypeUpdate(filter));
  };

  const handleLevelFilterChange = (filter: string) => {
    dispatch(catalogFilterLevelUpdate(filter));
  };

  const handleResetButtonClick = () => {
    dispatch(catalogFilterReset());
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceFilter />
        <CheckBoxFilter
          title={CategoryFilter.Title}
          filters={CategoryFilter.Filters}
          filterData={category}
          onFilterChange={handleCategoryFilterChange}
        />
        <CheckBoxFilter
          title={TypeFilter.Title}
          filters={TypeFilter.Filters}
          filterData={type}
          onFilterChange={handleTypeFilterChange}
          extraData={category}
        />
        <CheckBoxFilter
          title={LevelFilter.Title}
          filters={LevelFilter.Filters}
          filterData={level}
          onFilterChange={handleLevelFilterChange}
        />
        <button
          onClick={handleResetButtonClick}
          className="btn catalog-filter__reset-btn"
          type="button"
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
