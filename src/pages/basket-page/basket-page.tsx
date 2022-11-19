// import { useAppSelector } from '../../hooks/hooks';
// import { getOrderPostingError } from '../../store/basket-slice/selectors';
import { BreadCrumb, PreviousBreadCrumbs, StatusMessage } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketSection from '../../components/basket-section/basket-section';
import BasketItemDeletingPopup from '../../components/popups/basket-item-deleting-popup/basket-item-deleting-popup';
import SuccessPopup from '../../components/popups/success-popup/success-popup';
// import Error from '../../components/error/error';

function BasketPage(): JSX.Element {
  // const orderPostingError = useAppSelector(getOrderPostingError);

  // if (orderPostingError) {
  //   return <Error message={orderPostingError} />;
  // }

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
        <SuccessPopup title={StatusMessage.PostOrderSuccess} />
      </main>
    </MainLayout>
  );
}

export default BasketPage;
