import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function MainPage() {
  return (
    <Navigate to={AppRoute.Catalog} />
  );
}

export default MainPage;
