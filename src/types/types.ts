export type TBreadCrumb = {
  Name: string;
  Path: string;
};

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type PostingReview = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type Review = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
};

export type FilterValue = {
  Name: string;
  Title: string;
  DisableFilter: string | null;
};

export type BasketItem = {
  id: number;
  count: number;
};

export type Order = {
  camerasIds: number[];
  coupon: string | null;
};

export type TPromoCodeValidationStatus = 'valid' | 'invalid' | 'unknown';

export type AddToBasketPopupData = {
  isPopupOpened: boolean;
  product: Camera | null;
};

export type BasketItemDeletingPopupData = {
  isPopupOpened: boolean;
  basketItem: Camera | null;
};
