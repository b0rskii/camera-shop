import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">Страница не найдена</h2>
      <Link to={AppRoute.Main} className="not-found-page__link">
        На главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
