import React, { SetStateAction, Dispatch } from 'react';
import styles from './StarRate.module.css';
import inactiveStar from '../../assets/images/heart_3hgfdgqrwsv4.svg';
import activeStart from '../../assets/images/heart_3hgfdgqrwsv4 (1).svg';

type Props = {
    currentItem: number,
    setHoverItem: Dispatch<SetStateAction<number>>,
    stars: Array<number>,
    setCurrentItem: Dispatch<SetStateAction<number | undefined>>
}

const StarRate: React.FC<Props> = ({
  currentItem, setHoverItem, stars, setCurrentItem,
}) => (
        <div className={styles.feedBack__starsBox}>
                {
                  stars.map((item, index: number) => (
                      <img onClick={() => setCurrentItem(index)}
                        key={index}
                        src={ index <= currentItem ? activeStart : inactiveStar}
                        className={styles.feedBack__star}
                        onMouseMove={() => setHoverItem(index)}
                        // onMouseOut={() => setHoverItem(item)}
                       />
                  ))
                }
                </div>
);

export default StarRate;
