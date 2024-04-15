import React, { useState, useEffect } from 'react';
import styles from './IndependentSelect.module.css';
import Card from '../Card/Card.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import { getWizzards } from '../../services/wizzards';

const classNames = require('classnames');

export default function IndependentSelect({ setIsOpenPopup, isOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [firstOpponentId, setFirstOpponentId] = useState(JSON.parse(localStorage.getItem('firstOpponentId')) || '');
  const [secondOpponentId, setSecondOpponentId] = useState(JSON.parse(localStorage.getItem('secondOpponentId')) || '');
  const [wizzardsData, setWizzardsData] = useState([]);

  useEffect(() => {
    localStorage.setItem('opponentsFrom', JSON.stringify('manualSelect'));
    getWizzards()
      .then((res) => setWizzardsData(res));
  }, []);
  function openPopup() {
    setIsOpenPopup(true);
  }

  const toggleSelectionOpponent = (id, opponent) => {
    if (opponent === 'firstOpponentId') {
      if (firstOpponentId === id) {
        setFirstOpponentId('');
      } else {
        setFirstOpponentId(id);
      }
    }
    if (opponent === 'secondOpponentId') {
      if (secondOpponentId === id) {
        setSecondOpponentId('');
      } else {
        setSecondOpponentId(id);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('firstOpponentId', JSON.stringify(firstOpponentId));
  }, [firstOpponentId]);

  useEffect(() => {
    localStorage.setItem('secondOpponentId', JSON.stringify(secondOpponentId));
  }, [secondOpponentId]);

  useEffect(() => {
    setIsDisableButton(firstOpponentId === '' || secondOpponentId === '');
  }, [firstOpponentId, secondOpponentId]);
  return (
          <>
            <section className={styles.manual}>
              <div className={styles.manual__box}>
                <div className={styles.manual__container}>
                {wizzardsData.map((wizzard) => (
                    <Card
                      colorPlace={wizzard.id === firstOpponentId}
                      toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'firstOpponentId')}
                      key={wizzard.id}
                      name={wizzard.firstName}
                      lastName={wizzard.lastName}
                    />))}
                </div>
                <button
                onClick={openPopup}
                disabled={isDisableButton}
                className={classNames(styles.manual__button, { [styles.disable]: isDisableButton })}
                >Action!</button>
                <div className={styles.manual__container}>
                {wizzardsData.map((wizzard) => (
                    <Card
                      colorPlace={wizzard.id === secondOpponentId}
                      toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'secondOpponentId')}
                      key={wizzard.id}
                      name={wizzard.firstName}
                      lastName={wizzard.lastName}
                    />))}
                </div>
              </div>
            </section>
            {isOpenPopup && <PopupWithMessage setIsOpenPopup={setIsOpenPopup} text='Redirect to the battle page'></PopupWithMessage>}
          </>
  );
}
