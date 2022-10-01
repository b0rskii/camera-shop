import MainLayout from '../../components/main-layout/main-layout';
import Bunner from '../../components/banner/bunner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogContent from '../../components/catalog-content/catalog-content';
import PopupAddToBasket from '../../components/popup-add-to-basket/popup-add-to-basket';

function CatalogPage(): JSX.Element {
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
                <CatalogContent />
              </div>
            </div>
          </section>
        </div>
        <PopupAddToBasket />
      </main>
    </MainLayout>
  );
}

export default CatalogPage;
