import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCatalogSort } from '../../store/catalog-sort-slice/selectors';
import { getBasketItems } from '../../store/basket-slice/selectors';
import {
  getCatalogFilterCategory,
  getCatalogFilterLevel,
  getCatalogFilterMaxPrice,
  getCatalogFilterMinPrice,
  getCatalogFilterType
} from '../../store/catalog-filter-slice/selectors';
import {
  fetchCamerasAction,
  fetchMinPriceCameraAction,
  fetchMaxPriceCameraAction,
  fetchNearestMinPriceCameraAction,
  fetchNearestMaxPriceCameraAction
} from '../../store/api-actions';
import { Camera } from '../../types/types';
import ProductCard from '../product-card/product-card';
import Loader from '../loader/loader';
import './products-list.css';

type ProductsListProps = {
  products: Camera[];
  isProductsLoaded: boolean;
  startItemNumber: number;
};

function ProductsList(props: ProductsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {products, isProductsLoaded, startItemNumber} = props;

  const {sort, order} = useAppSelector(getCatalogSort);

  const minPrice = useAppSelector(getCatalogFilterMinPrice);
  const maxPrice = useAppSelector(getCatalogFilterMaxPrice);
  const category = useAppSelector(getCatalogFilterCategory);
  const type = useAppSelector(getCatalogFilterType);
  const level = useAppSelector(getCatalogFilterLevel);

  const basketItems = useAppSelector(getBasketItems);

  useEffect(() => {
    dispatch(fetchCamerasAction(startItemNumber));
    dispatch(fetchMinPriceCameraAction());
    dispatch(fetchMaxPriceCameraAction());

    if (minPrice && maxPrice !== minPrice) {
      dispatch(fetchNearestMinPriceCameraAction());
    }
    if (maxPrice && maxPrice !== minPrice) {
      dispatch(fetchNearestMaxPriceCameraAction());
    }
  }, [dispatch, startItemNumber, sort, order, minPrice, maxPrice, category, type, level]);

  if (!isProductsLoaded) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="cards catalog__cards">
      {products.length
        ? (
          products.map((product) => (
            <ProductCard
              product={product}
              isInBasket={basketItems.some((item) => item.id === product.id)}
              key={product.id}
            />
          ))
        ) : (
          <h3>По вашему запросу ничего не найдено</h3>
        )}
    </div>
  );
}

export default ProductsList;
