import { Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { ProductTab } from '../../const';

type ProductTabsProps = {
  product: Camera;
};

function ProductTabs({product}: ProductTabsProps): JSX.Element {
  const {vendorCode, category, type, level, description} = product;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {Object.values(ProductTab).map((value) => (
          <NavLink
            to={value.Path}
            className={({isActive}) => isActive ? 'tabs__control is-active' : 'tabs__control'}
            key={value.Name}
          >
            {value.Name}
          </NavLink>
        ))}
      </div>
      <div className="tabs__content">
        <Routes>
          <Route
            path={ProductTab.Characteristics.Path}
            element={
              <div className="tabs__element is-active">
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{level}</p>
                  </li>
                </ul>
              </div>
            }
          />
          <Route
            path={ProductTab.Description.Path}
            element={
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                  <p>{description}</p>
                </div>
              </div>
            }
          />
          <Route
            path="*"
            element={<Navigate to={ProductTab.Description.Path} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default ProductTabs;
