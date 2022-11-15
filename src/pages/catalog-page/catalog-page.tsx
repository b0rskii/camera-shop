import { useAppSelector } from '../../hooks/hooks';
import { getCamerasLoadingError } from '../../store/cameras-slice/selectors';
import { PreviousBreadCrumbs, BreadCrumb } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import AddToBasketPopup from '../../components/popups/add-to-basket-popup/add-to-basket-popup';
import SuccessAddToBasketPopup from '../../components/popups/success-add-to-basket-popup/success-add-to-basket-popup';
import Error from '../../components/error/error';

function CatalogPage(): JSX.Element {
  const camerasLoadingError = useAppSelector(getCamerasLoadingError);

  if (camerasLoadingError) {
    return (
      <Error message={camerasLoadingError} />
    );
  }

  return (
    <MainLayout>
      <main data-testid="catalog-page">
        <Banner />
        <div className="page-content">
          <BreadCrumbs
            previousBreadCrumbs={PreviousBreadCrumbs.Catalog}
            currentBreadCrumbName={BreadCrumb.Catalog.Name}
          />
          <CatalogSection />
        </div>
        <AddToBasketPopup />
        <SuccessAddToBasketPopup />
      </main>
    </MainLayout>
  );
}

export default CatalogPage;
