import { Camera, Promo, Review, PostingReview, FilterValue, BasketItem } from '../types/types';

export const Mock = {
  CamerasTotalCount: '50',
} as const;

export const makeMockCamera = (id = 1): Camera => ({
  id,
  name: 'Ретрокамера Dus Auge lV',
  vendorCode: 'DA4IU67AD5',
  type: 'Коллекционная',
  category: 'Видеокамера',
  description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
  level: 'Любительский',
  rating: 4,
  price: 73450,
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  reviewCount: 16
});

export const makeMockCameras = (count = 9): Camera[] => {
  const cameras: Camera[] = [];

  for (let i = 0; i < count; i++) {
    cameras.push({
      id: i + 1,
      name: 'Ретрокамера Dus Auge lV',
      vendorCode: 'DA4IU67AD5',
      type: 'Коллекционная',
      category: 'Видеокамера',
      description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
      level: 'Любительский',
      rating: 4,
      price: 73450,
      previewImg: 'img/content/das-auge.jpg',
      previewImg2x: 'img/content/das-auge@2x.jpg',
      previewImgWebp: 'img/content/das-auge.webp',
      previewImgWebp2x: 'img/content/das-auge@2x.webp',
      reviewCount: 16
    });
  }

  return cameras;
};

export const makeMockPromo = (): Promo => ({
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  previewImg: 'img/content/promo.jpg',
  previewImg2x: 'img/content/promo@2x.jpg',
  previewImgWebp: 'img/content/promo.webp',
  previewImgWebp2x: 'img/content/promo@2x.webp'
});

export const makeMockReview = (): Review => ({
  id: '2ab4a018-2e53-4f7c-abc7-7f868093e9a5',
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 4,
  createAt: '2022-07-09T13:24:57.980Z',
  cameraId: 1
});

export const makeMockReviews = (): Review[] => {
  const reviews: Review[] = [];

  for (let i = 0; i < 5; i++) {
    reviews.push({
      id: `${i + 1}`,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя первая камера. Я в восторге, нареканий нет',
      rating: 4,
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1
    });
  }

  return reviews;
};

export const makeMockPostingReview = (): PostingReview => ({
  cameraId: 1,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 4,
});

export const makeMockFilterValues = (): FilterValue[] => {
  const filterValues: FilterValue[] = [];

  for (let i = 0; i < 3; i++) {
    filterValues.push({
      Name: `filter ${i}`,
      Title: `title ${i}`,
      DisableFilter: `disable ${i}`,
    });
  }

  return filterValues;
};

export const makeMockBasketItems = (count = 3): BasketItem[] => {
  const basketItems: BasketItem[] = [];

  for (let i = 0; i < count; i++) {
    basketItems.push({
      id: i + 1,
      count: 1,
    });
  }

  return basketItems;
};
