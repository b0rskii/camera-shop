import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchCamerasAction } from '../../store/api-actions';
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
  const [params] = useSearchParams();
  const {products, isProductsLoaded, startItemNumber} = props;

  useEffect(() => {
    dispatch(fetchCamerasAction({
      startItem: startItemNumber,
      params
    }));
  }, [dispatch, params, startItemNumber]);

  if (!isProductsLoaded) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
}

export default ProductsList;
