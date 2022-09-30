import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { INITIAL_CATALOG_PAGE_NUMBER, CARDS_PER_PAGE_COUNT, PAGE_QUERY_REG_EXP } from '../../const';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductsList from '../products-list/products-list';
import Pagination from '../pagination/pagination';
import {
  getCameras,
  getCamerasTotalCount,
  getCamerasLoadingStatus
} from '../../store/data-process/selectors';


function CatalogContent() {
  const location = useLocation();
  const cameras = useAppSelector(getCameras);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const isCamerasLoaded = useAppSelector(getCamerasLoadingStatus);

  const initialCatalogPageNumber =
    Number(location.search.match(PAGE_QUERY_REG_EXP)?.join('').split('=')[1])
    || INITIAL_CATALOG_PAGE_NUMBER;

  const initialStartItemNumber = (initialCatalogPageNumber - 1) * CARDS_PER_PAGE_COUNT;
  const [currentPage, setCurrentPage] = useState<number>(initialCatalogPageNumber);
  const [startItemNumber, setStartItemNumber] = useState<number>(initialStartItemNumber);

  return (
    <div className="catalog__content">
      <CatalogSort />
      <ProductsList
        products={cameras}
        isPoductsLoaded={isCamerasLoaded}
        startItemNumber={startItemNumber}
      />
      <Pagination
        productsTotalCount={camerasTotalCount}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        onSetStartItemNumber={setStartItemNumber}
      />
    </div>
  );
}

export default CatalogContent;
