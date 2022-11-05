import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCatalogPage } from '../../store/catalog-pagination-slice/selectors';
import {
  getCameras,
  getCamerasTotalCount,
  getCamerasLoadingStatus
} from '../../store/cameras-slice/selectors';
import { catalogPageUpdate } from '../../store/catalog-pagination-slice/catalog-pagination-slice';
import {
  INITIAL_CATALOG_PAGE_NUMBER,
  CARDS_PER_PAGE_COUNT
} from '../../const';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductsList from '../products-list/products-list';
import Pagination from '../pagination/pagination';

function CatalogContent(): JSX.Element {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getCameras);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const isCamerasLoaded = useAppSelector(getCamerasLoadingStatus);
  const currentPage = useAppSelector(getCatalogPage);

  const startItemNumber = currentPage
    ? (Number(currentPage) - 1) * CARDS_PER_PAGE_COUNT
    : 0;

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
        currentPage={currentPage ? Number(currentPage) : INITIAL_CATALOG_PAGE_NUMBER}
        onSetCurrentPage={(value) => dispatch(catalogPageUpdate(value.toString()))}
      />
    </div>
  );
}

export default CatalogContent;
