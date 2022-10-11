import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import { api } from './store';
import { APIRoute, CARDS_PER_PAGE_COUNT, APIQuery } from '../const';
import {
  makeMockCameras,
  makeMockPromo,
  makeMockCamera,
  makeMockReviews,
  makeMockPostingReview,
  makeMockReview
} from '../utils/mocks';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCurrentCameraAction,
  fetchSimilarCamerasAction,
  fetchReviewsAction,
  postReviewAction
} from './api-actions';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('when GET /cameras and server response "ok" should set actions types to pending and fulfilled', async () => {
    const START_ITEM_NUMBER = 0;
    const cameras = makeMockCameras();

    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Cameras}?_start=${START_ITEM_NUMBER}&_limit=${CARDS_PER_PAGE_COUNT}`)
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
      .onGet(`${APIRoute.Cameras}?_start=${START_ITEM_NUMBER}&_limit=${CARDS_PER_PAGE_COUNT}`)
      .reply(400, cameras, Headers);

    await store.dispatch(fetchCamerasAction(START_ITEM_NUMBER));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.rejected.type
    ]);
  });

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

  it('when GET /cameras/{id}/reviews and server response "ok" should set actions types to pending and fulfilled', async () => {
    const ID = '1';
    const reviews = makeMockReviews();

    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Cameras}/${ID}${APIRoute.Reviews}?${APIQuery.Sort}createAt&${APIQuery.DescSort}`)
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
      .onGet(`${APIRoute.Cameras}/${ID}${APIRoute.Reviews}?${APIQuery.Sort}createAt&${APIQuery.DescSort}`)
      .reply(400, reviews);

    await store.dispatch(fetchReviewsAction(ID));

    const actionsTypes = store.getActions().map((action: Action<string>) => action.type);

    expect(actionsTypes).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.rejected.type
    ]);
  });

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
