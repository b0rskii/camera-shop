import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type SimilarProductsListProps = {
  products: Camera[];
}

function SimilarProductsList(props: SimilarProductsListProps): JSX.Element {
  const {products} = props;

  return (
    <div className="product-similar__slider-list">
      {products.map((camera, i) => (
        <ProductCard
          product={camera}
          key={camera.id}
          isActive
        />
      ))}
    </div>
  );
}

export default SimilarProductsList;
