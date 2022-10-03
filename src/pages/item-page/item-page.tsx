import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCurrentCameraAction, fetchReviewsAction } from '../../store/api-actions';
import { setCurrentProduct, setIsPopupOpened } from '../../store/app-process/app-process';
import {
  getCurrentCamera,
  getCurrentCameraLoadingStatus,
  getReviews,
  getReviewsLoadingStatus,
} from '../../store/data-process/selectors';
import {
  MAX_PRODUCT_RATE,
  DEFAULT_DISPLAYED_REVIEWS_COUNT,
  PreviousBreadCrumbs,
} from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import ItemsSlider from '../../components/items-slider/items-slider';
import SimilarProductsList from '../../components/similar-products-list/similar-products-list';
import ProductCardRating from '../../components/product-card-rating/product-card-rating';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PopupAddToBasket from '../../components/popup-add-to-basket/popup-add-to-basket';
import Loader from '../../components/loader/loader';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';

function ItemPage() {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const camera = useAppSelector(getCurrentCamera);
  const isCameraLoaded = useAppSelector(getCurrentCameraLoadingStatus);
  const reviews = useAppSelector(getReviews);
  const isReviewsLoaded = useAppSelector(getReviewsLoadingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentCameraAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  if (!isCameraLoaded || camera === null) {
    return <Loader />;
  }

  const addToBasketButtonClickHandler = () => {
    dispatch(setCurrentProduct(camera));
    dispatch(setIsPopupOpened(true));
  };

  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name} = camera;
  const {rating, reviewCount, price, description, vendorCode, category, type, level} = camera;

  return (
    <MainLayout>
      <main>
        <div className="page-content">
          <BreadCrumbs
            previousBreadCrumbs={PreviousBreadCrumbs.Item}
            currentBreadCrumbName={name}
          />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                    <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <ProductCardRating
                    maxRating={MAX_PRODUCT_RATE}
                    rating={rating}
                    reviewCount={reviewCount}
                  />
                  {/* <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                  </div> */}
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{price} ₽
                  </p>
                  <button
                    onClick={addToBasketButtonClickHandler}
                    className="btn btn--purple"
                    type="button"
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>

                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">Характеристики</button>
                      <button className="tabs__control is-active" type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <ItemsSlider>
                  <SimilarProductsList />
                </ItemsSlider>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ReviewsList
                  reviews={reviews}
                  isReviewsLoaded={isReviewsLoaded}
                  startDisplayedCount={DEFAULT_DISPLAYED_REVIEWS_COUNT}
                />
                {/* <ul className="review-block__list">
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Сергей Горский</p>
                      <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 5</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Пётр Матросов</p>
                      <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 1</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Хорошее пресс-папье</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Через 3 дня развалилась на куски</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Татьяна Кузнецова </p>
                      <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 4</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Редкая</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Высокая цена</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                      </li>
                    </ul>
                  </li>
                </ul> */}
                {/* <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div> */}
              </div>
            </section>
          </div>
        </div>
        <PopupAddToBasket />
      </main>
    </MainLayout>
  );
}

export default ItemPage;
