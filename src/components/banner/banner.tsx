import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { getPromo, getPromoLoadingStatus, getPromoLoadingError } from '../../store/promo-slice/selectors';
import { fetchPromoAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import Loader from '../loader/loader';
import Error from '../error/error';

function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const promo = useAppSelector(getPromo);
  const isPromoLoaded = useAppSelector(getPromoLoadingStatus);
  const promoLoadingError = useAppSelector(getPromoLoadingError);

  useEffect(() => {
    if (!promo) {
      dispatch(fetchPromoAction());
    }
  }, [dispatch, promo]);

  if (promoLoadingError) {
    return (
      <div className="banner">
        <Error />
      </div>
    );
  }

  if (!isPromoLoaded || promo === null) {
    return (
      <div className="banner">
        <Loader />
      </div>
    );
  }

  const {id, name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x} = promo;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
        <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Product}${id}`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
