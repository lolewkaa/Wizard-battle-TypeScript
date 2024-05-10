import React from 'react';
import styles from './Popup.module.css';

type Props = {
  onClose: () => void,
  children: any
}

const Popup: React.FC<Props> = ({ onClose, children }) => (
  <div className={styles.popup__container}>
    <div className={styles.popup}>
      {children}
    </div>
    <div onClick={onClose} className={styles.popup__overlay}></div>
  </div>
);

export default Popup;
