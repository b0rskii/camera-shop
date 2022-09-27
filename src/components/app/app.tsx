import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ItemPage from '../../pages/item-page/item-page';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage/>}
        />
        <Route
          path={AppRoute.Item}
          element={<ItemPage/>}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage/>}
        />
      </Routes>
    </Layout>
  );
}

export default App;
