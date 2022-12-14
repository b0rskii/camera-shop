import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <App />
    </HistoryRouter>
  </Provider>
);
