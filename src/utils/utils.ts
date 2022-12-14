import { Camera } from '../types/types';

const DATE_ATTRIBUTE_LENGTH = 10;

const PhotoCameraCategoryValue = {
  Server: 'Фотоаппарат',
  Client: 'Фотокамера',
};

const ToReviewDate = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
});

export const formatDateToAttribute = (date: string) => date.slice(0, DATE_ATTRIBUTE_LENGTH);
export const formatDateToReview = (date: string) => ToReviewDate.format(Date.parse(date));

export const fixScrollbarOpen = () => {
  if (window.innerWidth !== document.documentElement.clientWidth) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }
};

export const fixScrollbarClose = () => {
  if (document.documentElement.style.paddingRight !== '') {
    document.documentElement.style.paddingRight = '';
  }
};

export const debounce = (callback: ReturnType<typeof Function>, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(args);
    }, delay);
  };
};

export const removeSpaces = (string: string) => string.replace(/\s+/g, '');

export const adaptCameraToClient = (camera: Camera) => {
  const adaptedCamera = {
    ...camera,
    previewImg: `/${camera.previewImg}`,
    previewImg2x: `/${camera.previewImg2x}`,
    previewImgWebp: `/${camera.previewImgWebp}`,
    previewImgWebp2x: `/${camera.previewImgWebp2x}`,
    category: camera.category === PhotoCameraCategoryValue.Server
      ? PhotoCameraCategoryValue.Client
      : camera.category,
  };

  return adaptedCamera;
};

export const adaptCamerasToClient = (cameras: Camera[]) =>
  cameras.map((camera) => adaptCameraToClient(camera));
