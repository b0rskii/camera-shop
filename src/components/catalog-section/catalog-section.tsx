import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogContent from '../catalog-content/catalog-content';

function CatalogSection(): JSX.Element {
  return (
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
  );
}

export default CatalogSection;
