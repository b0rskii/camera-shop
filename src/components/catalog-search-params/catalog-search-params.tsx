import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { getCatalogSort } from '../../store/catalog-sort-slice/selectors';
import {
  getCatalogFilterMinPrice,
  getCatalogFilterMaxPrice,
  getCatalogFilterCategory,
  getCatalogFilterType,
  getCatalogFilterLevel,
  getCatalogFilterNearestMinPrice,
  getCatalogFilterNearestMaxPrice
} from '../../store/catalog-filter-slice/selectors';
import { getCatalogPage } from '../../store/catalog-pagination-slice/selectors';
import { AppQuery } from '../../const';

function CatalogSearchParams() {
  const [, setSearchParams] = useSearchParams();

  const {sort, order} = useAppSelector(getCatalogSort);

  const minPrice = useAppSelector(getCatalogFilterMinPrice);
  const maxPrice = useAppSelector(getCatalogFilterMaxPrice);
  const category = useAppSelector(getCatalogFilterCategory);
  const type = useAppSelector(getCatalogFilterType);
  const level = useAppSelector(getCatalogFilterLevel);
  const nearestMinPrice = useAppSelector(getCatalogFilterNearestMinPrice);
  const nearestMaxPrice = useAppSelector(getCatalogFilterNearestMaxPrice);

  const currentPage = useAppSelector(getCatalogPage);

  useEffect(() => {
    if (sort) {
      setSearchParams((params) => {
        params.set(AppQuery.CatalogSort, sort);
        return params;
      });
    }

    if (order) {
      setSearchParams((params) => {
        params.set(AppQuery.CatalogSortOrder, order);
        return params;
      });
    }
  }, [setSearchParams, sort, order]);

  useEffect(() => {
    setSearchParams((params) => {
      if (minPrice) {
        params.set(AppQuery.CatalogMinPriceFilter, nearestMinPrice ? nearestMinPrice : minPrice);
      } else {
        params.delete(AppQuery.CatalogMinPriceFilter);
      }
      return params;
    });
  }, [setSearchParams, minPrice, nearestMinPrice]);

  useEffect(() => {
    setSearchParams((params) => {
      if (maxPrice) {
        params.set(AppQuery.CatalogMaxPriceFilter, nearestMaxPrice ? nearestMaxPrice : maxPrice);
      } else {
        params.delete(AppQuery.CatalogMaxPriceFilter);
      }
      return params;
    });
  }, [setSearchParams, maxPrice, nearestMaxPrice]);

  useEffect(() => {
    setSearchParams((params) => {
      params.delete(AppQuery.CatalogCategoryFilter);
      category.forEach((item) => {
        params.append(AppQuery.CatalogCategoryFilter, item);
      });
      return params;
    });
  }, [setSearchParams, category]);

  useEffect(() => {
    setSearchParams((params) => {
      params.delete(AppQuery.CatalogTypeFilter);
      type.forEach((item) => {
        params.append(AppQuery.CatalogTypeFilter, item);
      });
      return params;
    });
  }, [setSearchParams, type]);

  useEffect(() => {
    setSearchParams((params) => {
      params.delete(AppQuery.CatalogLevelFilter);
      level.forEach((item) => {
        params.append(AppQuery.CatalogLevelFilter, item);
      });
      return params;
    });
  }, [setSearchParams, level]);

  useEffect(() => {
    setSearchParams((params) => {
      if (currentPage) {
        params.set(AppQuery.CatalogPage, currentPage);
      } else {
        params.delete(AppQuery.CatalogPage);
      }
      return params;
    });
  }, [setSearchParams, currentPage]);

  return (
    <> </>
  );
}

export default CatalogSearchParams;
