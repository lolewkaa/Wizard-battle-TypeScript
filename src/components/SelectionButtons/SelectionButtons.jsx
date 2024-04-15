import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectionButtons.module.css';
import Button from '../Button/Button.jsx';
import backgroundWood from '../../images/Background.jpg';
import stars from '../../images/stars.png';

export default function SelectionButtons({ setIsAutoSelect }) {
  const navigate = useNavigate();

  function autoSelection() {
    setIsAutoSelect(true);
    navigate('/auto-selection');
  }

  function manualSelection() {
    navigate('/manual-selection');
  }

  return (
      <>
      <section className={styles.selection}>
        <div className={styles.selection__mainContainer}>
        <h1 className={styles.section__title}>Get closer to the magic</h1>
        <img src={backgroundWood} alt='Dark sky with moon' className={styles.selection__image}/>
        <img src={stars} alt='Stars' className={styles.selection__imageStars}/>
        <div className={styles.section__box}>
          <h2 className={styles.section__subtitle}>You can choose manual or automatic selection</h2>
          <div className={styles.selection__container}>
            <Button buttonStyle={styles.selection__button} clickButton={manualSelection} text='Manual'/>
            <Button buttonStyle={styles.selection__button} clickButton={autoSelection} text='Automatically'/>
          </div>
        </div>
        </div>
      </section>
      </>
  );
}
