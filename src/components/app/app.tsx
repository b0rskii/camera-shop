import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Catalog}
        element={<CatalogPage />}
      />
      <Route
        path={AppRoute.ProductId}
        element={<ProductPage />}
      />
      <Route
        path={AppRoute.Basket}
        element={<BasketPage />}
      />
      <Route
        path="*"
        element={<p>Страница не найдена</p>}
      />
    </Routes>
  );
}

export default App;
