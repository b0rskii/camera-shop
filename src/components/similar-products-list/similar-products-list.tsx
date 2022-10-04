import { Camera } from '../../types/camera';
import { DISPLAYED_SLIDER_ITEMS_COUNT } from '../../const';
import ProductCard from '../product-card/product-card';

type SimilarProductsListProps = {
  products: Camera[];
  startDisplayedItem: number;
}

function SimilarProductsList(props: SimilarProductsListProps): JSX.Element {
  const {products, startDisplayedItem} = props;

  return (
    <div className="product-similar__slider-list">
      {products.map((camera, i) => (
        <ProductCard
          product={camera}
          isActive={i >= startDisplayedItem && i < startDisplayedItem + DISPLAYED_SLIDER_ITEMS_COUNT}
          key={camera.id}
        />
      ))}
    </div>
  );
}

export default SimilarProductsList;
