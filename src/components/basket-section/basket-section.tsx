import BasketItemsList from '../basket-items-list/basket-items-list';
import BasketSummary from '../basket-summary/basket-summary';

function BasketSection(): JSX.Element {
  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <BasketItemsList />
        <BasketSummary />
      </div>
    </section>
  );
}

export default BasketSection;
