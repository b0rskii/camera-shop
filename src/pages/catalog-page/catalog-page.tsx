import { PreviousBreadCrumbs, BreadCrumb } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import AddToBasketPopup from '../../components/popups/add-to-basket-popup/add-to-basket-popup';

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
          <CatalogSection />
        </div>
        <AddToBasketPopup />
      </main>
    </MainLayout>
  );
}

export default CatalogPage;
