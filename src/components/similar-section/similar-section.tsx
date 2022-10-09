import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  getSimilarCameras,
  getSimilarCamerasLoadingStatus,
  getSimilarCamerasLoadingError
} from '../../store/data-process/selectors';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import { DISPLAYED_SLIDER_ITEMS_COUNT } from '../../const';
import Slider from '../slider/slider';
import Loader from '../loader/loader';
import Error from '../error/error';

type SimilarSectionProps = {
  id: string;
};

function SimilarSection({id}: SimilarSectionProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const similarCameras = useAppSelector(getSimilarCameras);
  const isSimilarCamerasLoaded = useAppSelector(getSimilarCamerasLoadingStatus);
  const similarCamerasLoadingError = useAppSelector(getSimilarCamerasLoadingError);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchSimilarCamerasAction(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (isSimilarCamerasLoaded && !similarCamerasLoadingError && similarCameras.length < 1) {
    return null;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>

          {similarCamerasLoadingError &&
          <Error message={similarCamerasLoadingError} />}

          {!isSimilarCamerasLoaded &&
          <Loader wrapper />}

          {isSimilarCamerasLoaded && !similarCamerasLoadingError &&
          <Slider
            products={similarCameras}
            displayedItemsCount={DISPLAYED_SLIDER_ITEMS_COUNT}
          />}
        </div>
      </section>
    </div>
  );
}

export default SimilarSection;
