import { useAppSelector } from '../../hooks/hooks';
import { getError } from '../../store/error-slice/selectors';
import './error-message.css';

function Error(): JSX.Element | null {
  const errorMessage = useAppSelector(getError);

  if (errorMessage) {
    return <div className='error-message' data-testid="error-message">{errorMessage}</div>;
  }

  return null;
}

export default Error;
