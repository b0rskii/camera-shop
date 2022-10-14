import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { makeMockCamera } from '../../utils/mocks';
import { AppRoute, PreviousBreadCrumbs } from '../../const';
import HistoryRouter from '../history-router/history-router';
import BreadCrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: BreadCrumbs', () => {
  it('should render component correctly', () => {
    const camera = makeMockCamera();
    const previousBreadCrumbs = PreviousBreadCrumbs.Product;
    const currentBreadCrumbName = camera.name;

    render(
      <HistoryRouter history={history}>
        <BreadCrumbs
          previousBreadCrumbs={previousBreadCrumbs}
          currentBreadCrumbName={currentBreadCrumbName}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(currentBreadCrumbName)).toBeInTheDocument();

    PreviousBreadCrumbs.Product.forEach((crumb) => {
      expect(screen.getByText(crumb.Name)).toBeInTheDocument();
    });
  });

  it('should redirect to target page when user clicked to link', async () => {
    const camera = makeMockCamera();
    const previousBreadCrumbs = PreviousBreadCrumbs.Product;
    const currentBreadCrumbName = camera.name;
    const targetPage = PreviousBreadCrumbs.Product[1];

    history.push(AppRoute.Product);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Product}
            element={
              <BreadCrumbs
                previousBreadCrumbs={previousBreadCrumbs}
                currentBreadCrumbName={currentBreadCrumbName}
              />
            }
          />
          <Route
            path={targetPage.Path}
            element={<h1>CatalogPage</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/CatalogPage/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(targetPage.Name));

    expect(screen.getByText(/CatalogPage/i)).toBeInTheDocument();
  });
});
