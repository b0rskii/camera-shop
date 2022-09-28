import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ItemPage from '../../pages/item-page/item-page';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Catalog}
        element={<CatalogPage/>}
      />
      <Route
        path={AppRoute.ItemId}
        element={<ItemPage/>}
      />
      <Route
        path={AppRoute.Basket}
        element={<BasketPage/>}
      />
    </Routes>
  );
}

export default App;
