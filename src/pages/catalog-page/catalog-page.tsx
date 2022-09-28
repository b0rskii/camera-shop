import { useAppSelector } from '../../hooks';
import { getCamerasLoadingStatus } from '../../store/data-process/selectors';
import MainLayout from '../../components/main-layout/main-layout';
import Bunner from '../../components/banner/bunner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Pagination from '../../components/pagination/pagination';
import Loader from '../../components/loader/loader';

function CatalogPage(): JSX.Element {
  const isCamerasLoaded = useAppSelector(getCamerasLoadingStatus);

  if (!isCamerasLoaded) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <main>
        <Bunner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  <ProductCardsList />
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}

export default CatalogPage;
