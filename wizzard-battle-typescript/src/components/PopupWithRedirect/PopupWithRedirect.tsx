import React from 'react';
import { useLocation } from "react-router-dom";
import styles from './PopupWithRedirect.module.css';
import Counter from '../Counter/Counter.tsx';
import Popup from '../Popup/Popup.tsx';
import Button from '../ui/Button/Button.tsx';

type Props = {
  onClose: () => void,
  message: string,
  onRedirect: () => void,
}

const PopupWithRedirect: React.FC<Props> = ({ onClose, message, onRedirect }) => {
  const location = useLocation();
  const locationChoise = location.pathname === '/manual-selection' || location.pathname === '/auto-selection';
  const onTimeOver = () => {
    onClose();
    onRedirect();
  };
  return (
    <Popup onClose={onClose}>
      <h2 className={styles.popup__text}>{message}</h2>
      <Counter onStop={onTimeOver} />
      {locationChoise && <Button
      clickButton={onClose}
      buttonStyle={styles.popup__close}
      text='Change selection'
      />
      }
    </Popup>
  );
};

export default PopupWithRedirect;
