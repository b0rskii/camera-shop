import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/data-process/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardsList() {
  const products = useAppSelector(getCameras);

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

export default ProductCardsList;
