import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import {
  getCameras,
  getCamerasTotalCount,
  getCamerasLoadingStatus
} from '../../store/cameras-slice/selectors';
import {
  INITIAL_CATALOG_PAGE_NUMBER,
  CARDS_PER_PAGE_COUNT,
  CATALOG_PAGE_QUERY
} from '../../const';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductsList from '../products-list/products-list';
import Pagination from '../pagination/pagination';

function CatalogContent(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const isCamerasLoaded = useAppSelector(getCamerasLoadingStatus);

  const [searchParams, setSearchParams] = useSearchParams();

  const initialCatalogPageNumber =
    Number(searchParams.get(CATALOG_PAGE_QUERY))
    || INITIAL_CATALOG_PAGE_NUMBER;

  const initialStartItemNumber = (initialCatalogPageNumber - 1) * CARDS_PER_PAGE_COUNT;

  const [currentPage, setCurrentPage] = useState<number>(initialCatalogPageNumber);
  const [startItemNumber, setStartItemNumber] = useState<number>(initialStartItemNumber);

  return (
    <div className="catalog__content" data-testid="catalog-content">
      <CatalogSort />
      <ProductsList
        products={cameras}
        isProductsLoaded={isCamerasLoaded}
        startItemNumber={startItemNumber}
      />
      <Pagination
        productsTotalCount={camerasTotalCount}
        productsPerPageCount={CARDS_PER_PAGE_COUNT}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        onSetStartItemNumber={setStartItemNumber}
        onSetSearchParams={setSearchParams}
      />
    </div>
  );
}

export default CatalogContent;
