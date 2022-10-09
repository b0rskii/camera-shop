import { useNavigate } from 'react-router-dom';
import './error.css';

type ErrorProps = {
  message: string;
};

function Error({message}: ErrorProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper">
      <div className="error">
        <p>{message}</p>
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
