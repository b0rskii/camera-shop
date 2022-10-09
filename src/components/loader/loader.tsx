import './loader.css';

type LoaderProps = {
  wrapper?: boolean;
};

function Loader({wrapper}: LoaderProps): JSX.Element {
  if (wrapper) {
    return (
      <div className="product-similar__slider">
        <div className="loader"></div>
      </div>
    );
  }

  return <div className="loader"></div>;
}

export default Loader;
