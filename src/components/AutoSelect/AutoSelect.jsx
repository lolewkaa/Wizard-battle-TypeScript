import React, { useEffect, useState } from "react";
import styles from "./AutoSelect.module.css";
import Card from "../Card/Card.jsx";
import PopupWithMessage from "../PopupWithMessage/PopupWithMessage.jsx";
import { getWizzards } from '../../services/wizzards';
import { getRandomWizzard } from '../utils/utils';

const classNames = require('classnames');

export default function AutoSelect({ isOpenPopup, setIsOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [wizzardsData, setWizzardsData] = useState([]);
  const [firstOpponent, setFirstOpponent] = useState(
    JSON.parse(localStorage.getItem("firstOpponentId")) || null,
  );
  const [secondOpponent, setSecondOpponent] = useState(
    JSON.parse(localStorage.getItem("secondOpponentId")) || null,
  );

  useEffect(() => {
    if (localStorage.getItem("firstOpponentId") !== undefined) {
      setFirstOpponent(JSON.parse(localStorage.getItem("firstOpponentId")));
    }
    if (localStorage.getItem('secondOpponentId') !== undefined) {
      setFirstOpponent(JSON.parse(localStorage.getItem('secondOpponentId')));
    }
    localStorage.setItem('opponentsFrom', JSON.stringify('autoSelect'));
    getWizzards()
      .then((res) => setWizzardsData(res));
  }, []);

  const handleFindFighters = () => {
    setIsDisableButton(true);
    const animation = setInterval(() => {
      setFirstOpponent(getRandomWizzard(wizzardsData));
      setSecondOpponent(getRandomWizzard(wizzardsData));
    }, 200);
    setTimeout(() => {
      clearInterval(animation);
      setFirstOpponent(getRandomWizzard(wizzardsData));
      setSecondOpponent(getRandomWizzard(wizzardsData));
      setIsDisableButton(false);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem('firstOpponentId', JSON.stringify(firstOpponent));
  }, [firstOpponent]);

  useEffect(() => {
    localStorage.setItem('secondOpponentId', JSON.stringify(secondOpponent));
  }, [secondOpponent]);
  function openPopup() {
    setIsOpenPopup(true);
  }
  return (
    <section className={styles.auto}>
      <div className={styles.auto__box}>
      <Card
        name={firstOpponent?.firstName}
        lastName={firstOpponent?.lastName}
      />
      <div className={styles.auto__container}>
        <button
          className={classNames(styles.auto__button, { [styles.disable]: isDisableButton })}
          onClick={handleFindFighters}
          disabled={isDisableButton}
        >
          Find opponents
        </button>
        <button
          className={classNames(styles.auto__button, { [styles.disable]: isDisableButton })}
          disabled={isDisableButton}
          onClick={openPopup}
        >
          Action!
        </button>
      </div>
      <Card
        name={secondOpponent?.firstName}
        lastName={secondOpponent?.lastName}
      />
      </div>
      {isOpenPopup && (
        <PopupWithMessage
          setIsOpenPopup={setIsOpenPopup}
          text="Redirect to the battle page"
        ></PopupWithMessage>
      )}
    </section>
  );
}
