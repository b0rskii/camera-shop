import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeMockCameras } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Slider from './slider';

const makeMockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Slider', () => {
  it('should render with control buttons if products count more then displayed items count', () => {
    const DISPLAYED_ITEMS_COUNT = 3;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Slider
            products={cameras}
            displayedItemsCount={DISPLAYED_ITEMS_COUNT}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('slider')).toBeInTheDocument();
    expect(screen.getByTestId('control-prev')).toBeInTheDocument();
    expect(screen.getByTestId('control-next')).toBeInTheDocument();
  });

  it('should render without control buttons if products count not more then displayed items count', () => {
    const DISPLAYED_ITEMS_COUNT = 10;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Slider
            products={cameras}
            displayedItemsCount={DISPLAYED_ITEMS_COUNT}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('slider')).toBeInTheDocument();
    expect(screen.queryByTestId('control-prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('control-next')).not.toBeInTheDocument();
  });

  it('should scroll slider correctly when user clicks on control buttons', async () => {
    const DISPLAYED_ITEMS_COUNT = 3;
    const DEFAULT_START_INDEX = 0;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Slider
            products={cameras}
            displayedItemsCount={DISPLAYED_ITEMS_COUNT}
          />
        </HistoryRouter>
      </Provider>
    );

    const sliderItems = screen.getAllByTestId('product-card');
    const firstDisplayedItemIndex = sliderItems
      .findIndex((item: HTMLElement) => item.classList.contains('is-active'));

    expect(firstDisplayedItemIndex).toBe(DEFAULT_START_INDEX);

    await userEvent.click(screen.getByTestId('control-next'));

    const sliderItemsAfterNextClicked = screen.getAllByTestId('product-card');
    const firstDisplayedItemIndexAfterNextClicked = sliderItemsAfterNextClicked
      .findIndex((item: HTMLElement) => item.classList.contains('is-active'));

    const indexAfterNextClicked = DEFAULT_START_INDEX + 1;

    expect(firstDisplayedItemIndexAfterNextClicked).toBe(indexAfterNextClicked);

    await userEvent.click(screen.getByTestId('control-prev'));

    const sliderItemsAfterPrevClicked = screen.getAllByTestId('product-card');
    const firstDisplayedItemIndexAfterPrevClicked = sliderItemsAfterPrevClicked
      .findIndex((item: HTMLElement) => item.classList.contains('is-active'));

    const indexAfterPrevClicked = indexAfterNextClicked - 1;

    expect(firstDisplayedItemIndexAfterPrevClicked).toBe(indexAfterPrevClicked);
  });

  it('prev button should be disabled if slider starts on first item', () => {
    const DISPLAYED_ITEMS_COUNT = 3;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Slider
            products={cameras}
            displayedItemsCount={DISPLAYED_ITEMS_COUNT}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('slider')).toBeInTheDocument();
    expect(screen.getByTestId('control-prev')).toBeDisabled();
    expect(screen.queryByTestId('control-next')).not.toBeDisabled();
  });

  it('next button should be disabled if slider ends on last item', async () => {
    const DISPLAYED_ITEMS_COUNT = 8;
    const cameras = makeMockCameras();
    const store = makeMockStore({
      Basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Slider
            products={cameras}
            displayedItemsCount={DISPLAYED_ITEMS_COUNT}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('control-next'));

    expect(screen.getByTestId('slider')).toBeInTheDocument();
    expect(screen.getByTestId('control-next')).toBeDisabled();
    expect(screen.queryByTestId('control-prev')).not.toBeDisabled();
  });
});
