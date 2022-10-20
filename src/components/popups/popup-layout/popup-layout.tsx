import { PropsWithChildren, useEffect, useRef } from 'react';
import { fixScrollbarOpen, fixScrollbarClose } from '../../../utils/utils';
import { KeyName } from '../../../const';

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[tabindex]'
];

type PopupLayoutProps = PropsWithChildren<{
  isPopupOpened: boolean;
  onSetIsPopupOpened: (status: boolean) => void;
}>;

function PopupLayout({isPopupOpened, onSetIsPopupOpened, children}: PopupLayoutProps): JSX.Element | null {
  const popupContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPopupOpened) {
      return;
    }

    const handleEscapeKeyDown = (evt: globalThis.KeyboardEvent) => {
      if (evt.key === KeyName.Esc) {
        onSetIsPopupOpened(false);
      }
    };

    fixScrollbarOpen();
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      fixScrollbarClose();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [isPopupOpened, onSetIsPopupOpened]);

  useEffect(() => {
    if (!popupContentRef.current) {
      return;
    }

    const focusableElements = popupContentRef.current
      .querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS.join(', '));

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    lastFocusableElement.focus();

    const handleTabKeyDown = (evt: globalThis.KeyboardEvent) => {
      if (!evt.shiftKey && evt.key === KeyName.Tab && document.activeElement === lastFocusableElement) {
        evt.preventDefault();
        firstFocusableElement.focus();
      }

      if (evt.shiftKey && evt.key === KeyName.Tab && document.activeElement === firstFocusableElement) {
        evt.preventDefault();
        lastFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKeyDown);

    return () => {
      document.removeEventListener('keydown', handleTabKeyDown);
    };
  }, [isPopupOpened]);

  if (!isPopupOpened) {
    return null;
  }

  const handlePopupClick = () => {
    onSetIsPopupOpened(false);
  };

  return (
    <div className="modal is-active" data-testid="popup-layout">
      <div className="modal__wrapper">
        <div
          onClick={handlePopupClick}
          className="modal__overlay"
          data-testid="popup-overlay"
        >
        </div>
        <div
          onClick={(evt) => evt.stopPropagation()}
          className="modal__content"
          ref={popupContentRef}
        >
          {children}
          <button
            onClick={handlePopupClick}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            data-testid="close-button"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupLayout;
