import { MouseEvent } from 'react';

function UpButton(): JSX.Element {
  const upButtonClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      onClick={upButtonClickHandler}
      className="up-btn"
      href="#up"
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

export default UpButton;
