import { PreviousBreadCrumbs, BreadCrumb } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogContent from '../../components/catalog-content/catalog-content';
import PopupAddToBasket from '../../components/popup-add-to-basket/popup-add-to-basket';

function CatalogPage(): JSX.Element {
  return (
    <MainLayout>
      <main>
        <Banner />
        <div className="page-content">
          <BreadCrumbs
            previousBreadCrumbs={PreviousBreadCrumbs.Catalog}
            currentBreadCrumbName={BreadCrumb.Catalog.Name}
          />
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
