import { BreadCrumb, PreviousBreadCrumbs } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketSection from '../../components/basket-section/basket-section';
import BasketItemDeletingPopup from '../../components/popups/basket-item-deleting-popup/basket-item-deleting-popup';

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
      </main>
    </MainLayout>
  );
}

export default BasketPage;
