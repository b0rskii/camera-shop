import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleLinkClick = (evt: MouseEvent) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <div className="error-page">
      <h2 className="error-page__title">Произошла ошибка</h2>
      <a onClick={handleLinkClick} className="error-page__link" href="0">
        Вернуться назад
      </a>
    </div>
  );
}

export default ErrorPage;
