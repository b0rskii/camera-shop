import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import { api } from './store';
import { APIRoute } from '../const';
import {
  makeMockCameras,
  makeMockPromo,
  makeMockCamera,
  makeMockReviews,
  makeMockPostingReview,
  makeMockReview,
  makeMockBasketItems
} from '../utils/mocks';
import {
  fetchCamerasAction,
  fetchMinPriceCameraAction,
  fetchMaxPriceCameraAction,
  fetchNearestMinPriceCameraAction,
  fetchNearestMaxPriceCameraAction,
  fetchPromoAction,
  fetchCurrentCameraAction,
  fetchSimilarCamerasAction,
  fetchReviewsAction,
  postReviewAction,
  postPromoCodeAction,
  postOrderAction
} from './api-actions';
import { redirectToRoute } from './actions';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('fetchCamerasAction test', () => {
    it('when GET /cameras and server response "ok" should set actions types to pending and fulfilled', async () => {
      const START_ITEM_NUMBER = 0;
      const cameras = makeMockCameras();

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(200, cameras, Headers);

      await store.dispatch(fetchCamerasAction(START_ITEM_NUMBER));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type
      ]);
    });

    it('when GET /cameras and server response not "ok" should set actions types to pending and rejected', async () => {
      const START_ITEM_NUMBER = 0;
      const cameras = makeMockCameras();

      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(400, cameras, Headers);

      await store.dispatch(fetchCamerasAction(START_ITEM_NUMBER));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type
      ]);
    });
  });

  describe('fetchMinPriceCameraAction test', () => {
    it('when fetchMinPriceCameraAction and server response "ok" should set actions types to pending and fulfilled', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(200, camera);

      await store.dispatch(fetchMinPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchMinPriceCameraAction.pending.type,
        fetchMinPriceCameraAction.fulfilled.type
      ]);
    });

    it('when fetchMinPriceCameraAction and server response not "ok" should set actions types to pending and rejected', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(400, camera);

      await store.dispatch(fetchMinPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchMinPriceCameraAction.pending.type,
        fetchMinPriceCameraAction.rejected.type
      ]);
    });
  });

  describe('fetchMaxPriceCameraAction test', () => {
    it('when fetchMaxPriceCameraAction and server response "ok" should set actions types to pending and fulfilled', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(200, camera);

      await store.dispatch(fetchMaxPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchMaxPriceCameraAction.pending.type,
        fetchMaxPriceCameraAction.fulfilled.type
      ]);
    });

    it('when fetchMaxPriceCameraAction and server response not "ok" should set actions types to pending and rejected', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(400, camera);

      await store.dispatch(fetchMaxPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchMaxPriceCameraAction.pending.type,
        fetchMaxPriceCameraAction.rejected.type
      ]);
    });
  });

  describe('fetchNearestMinPriceCameraAction test', () => {
    it('when fetchNearestMinPriceCameraAction and server response "ok" should set actions types to pending and fulfilled', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(200, camera);

      await store.dispatch(fetchNearestMinPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchNearestMinPriceCameraAction.pending.type,
        fetchNearestMinPriceCameraAction.fulfilled.type
      ]);
    });

    it('when fetchNearestMinPriceCameraAction and server response not "ok" should set actions types to pending and rejected', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(400, camera);

      await store.dispatch(fetchNearestMinPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchNearestMinPriceCameraAction.pending.type,
        fetchNearestMinPriceCameraAction.rejected.type
      ]);
    });
  });

  describe('fetchNearestMaxPriceCameraAction test', () => {
    it('when fetchNearestMaxPriceCameraAction and server response "ok" should set actions types to pending and fulfilled', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(200, camera);

      await store.dispatch(fetchNearestMaxPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchNearestMaxPriceCameraAction.pending.type,
        fetchNearestMaxPriceCameraAction.fulfilled.type
      ]);
    });

    it('when fetchNearestMaxPriceCameraAction and server response not "ok" should set actions types to pending and rejected', async () => {
      const camera = [makeMockCamera()];

      const store = mockStore({
        CatalogSort: {
          sort: null,
          order: null,
        },
        CatalogFilter: {
          minPrice: null,
          maxPrice: null,
          category: [],
          type: [],
          level: [],
        }
      });

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(400, camera);

      await store.dispatch(fetchNearestMaxPriceCameraAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchNearestMaxPriceCameraAction.pending.type,
        fetchNearestMaxPriceCameraAction.rejected.type
      ]);
    });
  });

  describe('fetchPromoAction test', () => {
    it('when GET /promo and server response "ok" should set actions types to pending and fulfilled', async () => {
      const promo = makeMockPromo();

      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Promo)
        .reply(200, promo);

      await store.dispatch(fetchPromoAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type
      ]);
    });

    it('when GET /promo and server response not "ok" should set actions types to pending and rejected', async () => {
      const promo = makeMockPromo();

      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Promo)
        .reply(400, promo);

      await store.dispatch(fetchPromoAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type
      ]);
    });
  });

  describe('fetchCurrentCameraAction test', () => {
    it('when GET /cameras/{id} and server response "ok" should set actions types to pending and fulfilled', async () => {
      const ID = '1';
      const camera = makeMockCamera();

      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${ID}`)
        .reply(200, camera);

      await store.dispatch(fetchCurrentCameraAction(ID));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchCurrentCameraAction.pending.type,
        fetchCurrentCameraAction.fulfilled.type
      ]);
    });

    it('when GET /cameras/{id} and server response not "ok" should set actions types to pending and rejected', async () => {
      const ID = '1';
      const camera = makeMockCamera();

      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${ID}`)
        .reply(400, camera);

      await store.dispatch(fetchCurrentCameraAction(ID));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchCurrentCameraAction.pending.type,
        fetchCurrentCameraAction.rejected.type
      ]);
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('when GET /cameras/{id}/similar and server response "ok" should set actions types to pending and fulfilled', async () => {
      const ID = '1';
      const cameras = makeMockCameras();

      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${ID}${APIRoute.Similar}`)
        .reply(200, cameras);

      await store.dispatch(fetchSimilarCamerasAction(ID));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.fulfilled.type
      ]);
    });

    it('when GET /cameras/{id}/similar and server response not "ok" should set actions types to pending and rejected', async () => {
      const ID = '1';
      const cameras = makeMockCameras();

      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${ID}${APIRoute.Similar}`)
        .reply(400, cameras);

      await store.dispatch(fetchSimilarCamerasAction(ID));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.rejected.type
      ]);
    });
  });

  describe('fetchReviewsAction test', () => {
    it('when GET /cameras/{id}/reviews and server response "ok" should set actions types to pending and fulfilled', async () => {
      const ID = '1';
      const reviews = makeMockReviews();

      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${ID}${APIRoute.Reviews}`)
        .reply(200, reviews);

      await store.dispatch(fetchReviewsAction(ID));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

    it('when GET /cameras/{id}/reviews and server response not "ok" should set actions types to pending and rejected', async () => {
      const ID = '1';
      const reviews = makeMockReviews();

      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${ID}${APIRoute.Reviews}`)
        .reply(400, reviews);

      await store.dispatch(fetchReviewsAction(ID));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type
      ]);
    });
  });

  describe('postReviewAction test', () => {
    it('when POST /reviews and server response "ok" should set actions types to pending and fulfilled', async () => {
      const postingReview = makeMockPostingReview();
      const newReview = makeMockReview();

      const store = mockStore();

      mockAPI
        .onPost(APIRoute.Reviews, postingReview)
        .reply(200, newReview);

      await store.dispatch(postReviewAction(postingReview));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type
      ]);
    });

    it('when POST /reviews and server response not "ok" should set actions types to pending and rejected', async () => {
      const postingReview = makeMockPostingReview();
      const newReview = makeMockReview();

      const store = mockStore();

      mockAPI
        .onPost(APIRoute.Reviews, postingReview)
        .reply(400, newReview);

      await store.dispatch(postReviewAction(postingReview));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type
      ]);
    });
  });

  describe('postPromoCodeAction test', () => {
    it('when POST /coupons and server response "ok" should set actions types to pending and fulfilled', async () => {
      const DISCOUNT = 15;
      const postingPromoCode = {coupon: 'promo-code'};

      const store = mockStore();

      mockAPI
        .onPost(APIRoute.Coupons, postingPromoCode)
        .reply(200, DISCOUNT);

      await store.dispatch(postPromoCodeAction(postingPromoCode));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        postPromoCodeAction.pending.type,
        postPromoCodeAction.fulfilled.type
      ]);
    });

    it('when POST /coupons and server response not "ok" should set actions types to pending and rejected', async () => {
      const postingPromoCode = {coupon: 'promo-code'};

      const store = mockStore();

      mockAPI
        .onPost(APIRoute.Coupons, postingPromoCode)
        .reply(400, undefined);

      await store.dispatch(postPromoCodeAction(postingPromoCode));

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        postPromoCodeAction.pending.type,
        postPromoCodeAction.rejected.type
      ]);
    });
  });

  describe('postOrderAction test', () => {
    it('when POST /orders and server response "ok" should set actions types to pending and fulfilled', async () => {
      const COUPON = 'camera-333';
      const basketItems = makeMockBasketItems();
      const camerasIds = basketItems.map((item) => item.value.id);
      const postingOrder = {
        camerasIds,
        coupon: COUPON,
      };

      const store = mockStore({
        Basket: {
          basketItems,
          promoCode: COUPON,
        }
      });

      mockAPI
        .onPost(APIRoute.Orders, postingOrder)
        .reply(200);

      await store.dispatch(postOrderAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        postOrderAction.pending.type,
        postOrderAction.fulfilled.type
      ]);
    });

    it('when POST /orders and server response not "ok" should set actions types to pending, rejected and redirect', async () => {
      const COUPON = 'camera-333';
      const basketItems = makeMockBasketItems();
      const camerasIds = basketItems.map((item) => item.value.id);
      const postingOrder = {
        camerasIds,
        coupon: COUPON,
      };

      const store = mockStore({
        Basket: {
          basketItems,
          promoCode: COUPON,
        }
      });

      mockAPI
        .onPost(APIRoute.Orders, postingOrder)
        .reply(400);

      await store.dispatch(postOrderAction());

      const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

      expect(actionsTypes).toEqual([
        postOrderAction.pending.type,
        redirectToRoute.type,
        postOrderAction.rejected.type
      ]);
    });
  });
});
