import { BreadCrumb, PreviousBreadCrumbs, StatusMessage, AppRoute } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketSection from '../../components/basket-section/basket-section';
import BasketItemDeletingPopup from '../../components/popups/basket-item-deleting-popup/basket-item-deleting-popup';
import SuccessPopup from '../../components/popups/success-popup/success-popup';

function BasketPage(): JSX.Element {
  return (
    <MainLayout>
      <main data-testid="basket-page">
        <div className="page-content">
          <BreadCrumbs
            previousBreadCrumbs={PreviousBreadCrumbs.Basket}
            currentBreadCrumbName={BreadCrumb.Basket.Name}
          />
          <BasketSection />
        </div>
        <BasketItemDeletingPopup />
        <SuccessPopup
          title={StatusMessage.PostOrderSuccess}
          redirectRoute={AppRoute.Catalog}
        />
      </main>
    </MainLayout>
  );
}

export default BasketPage;
