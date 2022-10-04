import { Link } from 'react-router-dom';
import { TBreadCrumb } from '../../types/bread-crumb';

type BreadCrumbsProps = {
  previousBreadCrumbs: readonly TBreadCrumb[];
  currentBreadCrumbName: string;
};

function BreadCrumbs({previousBreadCrumbs, currentBreadCrumbName}: BreadCrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {previousBreadCrumbs.map((crumb) => (
            <li className="breadcrumbs__item" key={crumb.Name}>
              <Link className="breadcrumbs__link" to={crumb.Path}>
                {crumb.Name}
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>
            </li>
          ))}
          <li className="breadcrumbs__item" key={currentBreadCrumbName}>
            <span className="breadcrumbs__link breadcrumbs__link--active">{currentBreadCrumbName}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbs;
