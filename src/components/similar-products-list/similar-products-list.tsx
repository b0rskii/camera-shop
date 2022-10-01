import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSimilarCameras, getSimilarCamerasLoadingStatus } from '../../store/data-process/selectors';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import { DISPLAYED_SLIDER_ITEMS_COUNT } from '../../const';
import ProductCard from '../product-card/product-card';
import Loader from '../loader/loader';

function SimilarProductsList() {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const similarCameras = useAppSelector(getSimilarCameras);
  const isSimilarCamerasLoaded = useAppSelector(getSimilarCamerasLoadingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarCamerasAction(id));
    }
  }, [dispatch, id]);

  if (!isSimilarCamerasLoaded) {
    return <Loader />;
  }

  return (
    <div className="product-similar__slider-list">
      {similarCameras.map((camera, i) => (
        <ProductCard
          product={camera}
          isActive={i < DISPLAYED_SLIDER_ITEMS_COUNT}
          key={camera.id}
        />
      ))}
    </div>
  );
}

export default SimilarProductsList;
