import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSearchingCameras } from '../../store/cameras-slice/selectors';
import { fetchSearchingCamerasAction } from '../../store/api-actions';
import { searchingCamerasReset } from '../../store/cameras-slice/cameras-slice';
import { debounce } from '../../utils/utils';
import { AppRoute, KeyName } from '../../const';

const DEBOUNCE_DELAY = 300;

function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const searchingCameras = useAppSelector(getSearchingCameras);

  const debouncedFetchSearchingCameras = useMemo(() => debounce((value: string) => {
    dispatch(fetchSearchingCamerasAction(value));
  }, DEBOUNCE_DELAY), [dispatch]);

  useEffect(() => {
    if (text.length) {
      debouncedFetchSearchingCameras(text);
    }
  }, [debouncedFetchSearchingCameras, text]);

  useEffect(() => {
    if (!text.length && searchingCameras.length) {
      dispatch(searchingCamerasReset());
    }
  }, [dispatch, text, searchingCameras]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.currentTarget.value);
  };

  const handleResetButtonClick = () => {
    setText('');
    dispatch(searchingCamerasReset());
  };

  const handleSearchItemClick = (id: number) => {
    navigate(`${AppRoute.Product}${id}`);
  };

  const handleSearchItemEnterKeyDown = (evt: KeyboardEvent<HTMLElement>, id: number) => {
    if (evt.key === KeyName.Enter) {
      navigate(`${AppRoute.Product}${id}`);
    }
  };

  return (
    <div className={`form-search ${searchingCameras.length ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            onChange={handleInputChange}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={text}
          />
        </label>
        <ul className="form-search__select-list">
          {searchingCameras.length &&
          searchingCameras.map((camera) => (
            <li
              onClick={() => handleSearchItemClick(camera.id)}
              onKeyDown={(evt) => handleSearchItemEnterKeyDown(evt, camera.id)}
              key={camera.id}
              className="form-search__select-item"
              tabIndex={0}
            >
              {camera.name}
            </li>
          ))}
        </ul>
      </form>
      <button onClick={handleResetButtonClick} className="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default Search;
