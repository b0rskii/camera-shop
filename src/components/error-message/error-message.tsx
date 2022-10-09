import { useAppSelector } from '../../hooks/hooks';
import { getError } from '../../store/data-process/selectors';
import './error-message.css';

function Error(): JSX.Element | null {
  const errorMessage = useAppSelector(getError);

  if (errorMessage) {
    return <div className='error-message'>{errorMessage}</div>;
  }

  return null;
}

export default Error;
