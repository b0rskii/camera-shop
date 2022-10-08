import { Camera } from '../../types/types';
import ProductCard from '../product-card/product-card';

type SimilarProductsListProps = {
  products: Camera[];
  startDisplayedIndex: number;
  displayedItemsCount: number;
}

function SimilarProductsList(props: SimilarProductsListProps): JSX.Element {
  const {products, startDisplayedIndex, displayedItemsCount} = props;

  return (
    <div className="product-similar__slider-list">
      {products.map((camera, i) => (
        <ProductCard
          product={camera}
          key={camera.id}
          isActive={i >= startDisplayedIndex && i < displayedItemsCount + startDisplayedIndex}
        />
      ))}
    </div>
  );
}

export default SimilarProductsList;
