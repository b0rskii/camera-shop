import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchBasketCamerasAction } from '../../store/api-actions';
import {
  getBasketCamerasLoadingError,
  getBasketCamerasLoadingStatus,
  getBasketItems
} from '../../store/basket-slice/selectors';
import BasketItemsList from '../basket-items-list/basket-items-list';
import BasketSummary from '../basket-summary/basket-summary';
import Loader from '../loader/loader';
import Error from '../error/error';

function BasketSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCamerasLoading = useAppSelector(getBasketCamerasLoadingStatus);
  const basketItems = useAppSelector(getBasketItems);
  const camerasLoadingError = useAppSelector(getBasketCamerasLoadingError);

  useEffect(() => {
    if (!basketItems.length) {
      return;
    }
    dispatch(fetchBasketCamerasAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className="basket" data-testid="basket-section">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        {isCamerasLoading &&
        <Loader />}

        {!isCamerasLoading && camerasLoadingError &&
        <Error />}

        {!isCamerasLoading && !camerasLoadingError && !basketItems.length &&
        <h3>Здесь пока ничего нет</h3>}

        {!isCamerasLoading && !camerasLoadingError && basketItems.length > 0 &&
        <>
          <BasketItemsList />
          <BasketSummary />
        </>}
      </div>
    </section>
  );
}

export default BasketSection;
