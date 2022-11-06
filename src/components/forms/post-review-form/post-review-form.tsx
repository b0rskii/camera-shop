import React, { FormEvent, ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getCurrentCamera } from '../../../store/current-camera-slice/selectors';
import { postReviewAction } from '../../../store/api-actions';
import { RatingInput, COMMENT_MIN_LENGTH } from '../../../const';

function PostReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameraId = useAppSelector(getCurrentCamera)?.id;

  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [isDisabled, setDisabled] = useState(false);

  const [rating, setRating] = useState(0);
  const [isRatingFocused, setIsRatingFocused] = useState(false);

  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);

  const [advantage, setAdvantage] = useState('');
  const [isAdvantageFocused, setIsAdvantageFocused] = useState(false);

  const [disadvantage, setDisadvantage] = useState('');
  const [isDisadvantageFocused, setIsDisadvantageFocused] = useState(false);

  const [comment, setComment] = useState('');
  const [isCommentFocused, setIsCommentFocused] = useState(false);

  const isRatingValid = rating > 0;
  const isNameValid = name.length > 0;
  const isAdvantageValid = advantage.length > 0;
  const isDisadvantageValid = disadvantage.length > 0;
  const isCommentValid = comment.length >= COMMENT_MIN_LENGTH;

  const ratingInputs: ReactNode[] = [];

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isFirstSubmit) {
      setIsFirstSubmit(false);
    }

    if (isRatingValid && isNameValid && isAdvantageValid && isDisadvantageValid && isCommentValid && cameraId) {
      setDisabled(true);

      dispatch(postReviewAction({
        cameraId: cameraId,
        userName: name,
        advantage: advantage,
        disadvantage: disadvantage,
        review: comment,
        rating: rating,
      })).finally(() => setDisabled(false));
    }
  };

  Object.entries(RatingInput).reverse().forEach((item) => {
    const value = item[0];
    const title = item[1];

    ratingInputs.push(
      <React.Fragment key={title}>
        <input
          onChange={() => setRating(Number(value))}
          onFocus={() => setIsRatingFocused(true)}
          onBlur={() => setIsRatingFocused(false)}
          className="visually-hidden"
          id={`star-${value}`}
          name="rate"
          type="radio"
          value={value}
          data-testid="rating-input"
        />
        <label className="rate__label" htmlFor={`star-${value}`} title={title} />
      </React.Fragment>
    );
  });

  return (
    <form onSubmit={handleFormSubmit} method="post" noValidate>
      <div className="form-review__rate">
        <fieldset className={`rate form-review__item ${!isRatingValid && !isFirstSubmit && !isRatingFocused ? 'is-invalid' : ''}`}>
          <legend className="rate__caption">
            Рейтинг
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </legend>
          <div className="rate__bar">
            <div className="rate__group" tabIndex={0}>
              {ratingInputs}
            </div>
            <div className="rate__progress">
              <span className="rate__stars">{rating}</span>
              <span>/</span>
              <span className="rate__all-stars">{ratingInputs.length}</span>
            </div>
          </div>
          <p className="rate__message">Нужно оценить товар</p>
        </fieldset>
        <div className={`custom-input form-review__item ${!isNameValid && !isFirstSubmit && !isNameFocused ? 'is-invalid' : ''}`}>
          <label>
            <span className="custom-input__label">
              Ваше имя
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              onChange={(evt) => setName(evt.currentTarget.value)}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
              type="text"
              name="user-name"
              placeholder="Введите ваше имя"
              value={name}
            />
          </label>
          <p className="custom-input__error">Нужно указать имя</p>
        </div>
        <div className={`custom-input form-review__item ${!isAdvantageValid && !isFirstSubmit && !isAdvantageFocused ? 'is-invalid' : ''}`}>
          <label>
            <span className="custom-input__label">
              Достоинства
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              onChange={(evt) => setAdvantage(evt.currentTarget.value)}
              onFocus={() => setIsAdvantageFocused(true)}
              onBlur={() => setIsAdvantageFocused(false)}
              type="text"
              name="user-plus"
              placeholder="Основные преимущества товара"
              value={advantage}
            />
          </label>
          <p className="custom-input__error">Нужно указать достоинства</p>
        </div>
        <div className={`custom-input form-review__item ${!isDisadvantageValid && !isFirstSubmit && !isDisadvantageFocused ? 'is-invalid' : ''}`}>
          <label>
            <span className="custom-input__label">
              Недостатки
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              onChange={(evt) => setDisadvantage(evt.currentTarget.value)}
              onFocus={() => setIsDisadvantageFocused(true)}
              onBlur={() => setIsDisadvantageFocused(false)}
              type="text"
              name="user-minus"
              placeholder="Главные недостатки товара"
              value={disadvantage}
            />
          </label>
          <p className="custom-input__error">Нужно указать недостатки</p>
        </div>
        <div className={`custom-textarea form-review__item ${!isCommentValid && !isFirstSubmit && !isCommentFocused ? 'is-invalid' : ''}`}>
          <label>
            <span className="custom-textarea__label">Комментарий
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <textarea
              onChange={(evt) => setComment(evt.currentTarget.value)}
              onFocus={() => setIsCommentFocused(true)}
              onBlur={() => setIsCommentFocused(false)}
              name="user-comment"
              minLength={COMMENT_MIN_LENGTH}
              placeholder="Поделитесь своим опытом покупки"
              value={comment}
            >
            </textarea>
          </label>
          <div className="custom-textarea__error">Нужно добавить комментарий</div>
        </div>
      </div>
      <button
        className="btn btn--purple form-review__btn"
        type="submit"
        disabled={isDisabled}
      >
          Отправить отзыв
      </button>
    </form>
  );
}

export default PostReviewForm;
