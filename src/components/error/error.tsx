import { useNavigate } from 'react-router-dom';
import { DEFAULT_ERROR_MESSAGE } from '../../const';
import './error.css';

function Error(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper">
      <div className="error">
        <p>{DEFAULT_ERROR_MESSAGE}</p>
        <button
          onClick={() => navigate(0)}
          className="btn"
          type="button"
        >
          Обновить
        </button>
      </div>
    </div>
  );
}

export default Error;
