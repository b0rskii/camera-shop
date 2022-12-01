import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className="error-page">
      <h2 className="error-page__title">Страница не найдена</h2>
      <Link to={AppRoute.Main} className="error-page__link">
        На главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
