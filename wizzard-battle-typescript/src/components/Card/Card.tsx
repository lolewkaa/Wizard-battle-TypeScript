import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Card.module.css';
import wizardImg from '../../assets/images/cartman.jpg';

type Props = {
    name: string,
    lastName: string,
    toggleSelectionOpponent?: () => void,
    colorPlace?: boolean
}

const Card: React.FC<Props> = ({
  name,
  lastName,
  toggleSelectionOpponent,
  colorPlace,
}) => {
  const location = useLocation();
  const button: boolean = location.pathname === '/manual-selection';

  return (
          <>
            <div className={styles.card}>
              <img className={styles.card__img} src={wizardImg} alt='Wizard avatar'/>
              <div className={styles.card__box}>
                <div className={styles.card__container}>
                  <h2 className={styles.card__name}>{name}</h2>
                  <h2 className={styles.card__name}>{lastName}</h2>
                </div>
                {button && <button
                onClick={toggleSelectionOpponent}
                className={styles.card__btn}
                style={{ opacity: colorPlace ? '1' : '0.5' }}
                >Choose</button>}
               </div>
              </div>

          </>
  );
};

export default Card;
