import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSimilarCameras } from '../../store/data-process/selectors';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import ItemsSlider from '../items-slider/items-slider';

type SimilarSectionProps = {
  id: string;
};

function SimilarSection({id}: SimilarSectionProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const similarCameras = useAppSelector(getSimilarCameras);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchSimilarCamerasAction(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (similarCameras.length < 1) {
    return null;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <ItemsSlider
            products={similarCameras}
          />
        </div>
      </section>
    </div>
  );
}

export default SimilarSection;
