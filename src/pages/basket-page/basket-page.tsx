import { BreadCrumb, PreviousBreadCrumbs } from '../../const';
import MainLayout from '../../components/main-layout/main-layout';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketSection from '../../components/basket-section/basket-section';

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
      </main>
    </MainLayout>
  );
}

export default BasketPage;
