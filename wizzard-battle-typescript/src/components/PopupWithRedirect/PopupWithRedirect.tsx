import React from 'react';
import styles from './PopupWithRedirect.module.css';
import Counter from '../Counter/Counter.tsx';
import Popup from '../Popup/Popup.tsx';

type Props = {
  onClose: () => void,
  message: string
}

const PopupWithRedirect: React.FC<Props> = ({ onClose, message }) => (
    <Popup onClose={onClose}>
      <h2 className={styles.popup__text}>{message}</h2>
      <Counter onStop={onClose} />
      {/* <button
        onClick={onClose}
        className={styles.popup__close}
      >
        Change selection
      </button> */}
    </Popup>
);

export default PopupWithRedirect;
