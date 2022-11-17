import { useAppSelector } from '../../hooks/hooks';
import { getBasketItems } from '../../store/basket-slice/selectors';
import { Camera } from '../../types/types';
import ProductCard from '../product-card/product-card';

type SimilarProductsListProps = {
  products: Camera[];
  startDisplayedIndex: number;
  displayedItemsCount: number;
}

function SimilarProductsList(props: SimilarProductsListProps): JSX.Element {
  const {products, startDisplayedIndex, displayedItemsCount} = props;
  const basketItems = useAppSelector(getBasketItems);

  return (
    <div className="product-similar__slider-list">
      {products.map((camera, i) => (
        <ProductCard
          product={camera}
          isInBasket={basketItems.some((item) => item.value.id === camera.id)}
          key={camera.id}
          isActive={i >= startDisplayedIndex && i < displayedItemsCount + startDisplayedIndex}
        />
      ))}
    </div>
  );
}

export default SimilarProductsList;
