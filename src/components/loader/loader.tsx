import './loader.css';

type LoaderProps = {
  wrapper?: boolean;
};

function Loader({wrapper}: LoaderProps): JSX.Element {
  if (wrapper) {
    return (
      <div className="product-similar__slider" data-testid="loader-wrapper">
        <div className="loader" data-testid="loader"></div>
      </div>
    );
  }

  return <div className="loader" data-testid="loader"></div>;
}

export default Loader;
