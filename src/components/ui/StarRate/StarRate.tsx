import React from "react";
import styles from "./StarRate.module.css";
import inactiveStar from "../../../assets/images/heart_3hgfdgqrwsv4.svg";
import activeStart from "../../../assets/images/heart_3hgfdgqrwsv4 (1).svg";

type PropsStarRate = {
  currentItem: number | null;
  // eslint-disable-next-line no-unused-vars
  setHoverItem: (arg: number) => void;
  stars: Array<number>;
  // eslint-disable-next-line no-unused-vars
  setCurrentItem: (arg: number | null) => void;
};

const StarRate: React.FC<PropsStarRate> = ({
  currentItem,
  setHoverItem,
  stars,
  setCurrentItem,
}) => (
  <div className={styles.feedBack__starsBox}>
    {stars.map((item, index: number) => (
      <img
        onClick={() => setCurrentItem(index)}
        key={index}
        src={
          currentItem !== null && index <= currentItem
            ? activeStart
            : inactiveStar
        }
        className={styles.feedBack__star}
        onMouseMove={() => setHoverItem(index)}
        // onMouseOut={() => setHoverItem(item)}
      />
    ))}
  </div>
);

export default StarRate;
