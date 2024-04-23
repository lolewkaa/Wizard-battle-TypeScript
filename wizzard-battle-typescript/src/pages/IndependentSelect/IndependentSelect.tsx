import React, {
  useState, useEffect, SetStateAction, Dispatch,
} from 'react';
import classNames from 'classnames';
import styles from './IndependentSelect.module.css';
import Card from '../../components/Card/Card.tsx';
import PopupWithMessage from '../../components/PopupWithMessage/PopupWithMessage.tsx';
import { getWizzards } from '../../services/wizzards.tsx';

type Props = {
    isOpenPopup: boolean,
    setIsOpenPopup: Dispatch<SetStateAction<boolean>>
}

type WizardObject = {
    id: string,
    firstName: string,
    lastName: string
}

const IndependentSelect: React.FC<Props> = ({ setIsOpenPopup, isOpenPopup }) => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const firstOpponentJson = localStorage.getItem('firstOpponentId');
  const secondOpponentJson = localStorage.getItem('secondOpponentId');
  const [firstOpponentId, setFirstOpponentId] = useState(
    firstOpponentJson ? JSON.parse(firstOpponentJson) : null,
  );
  const [secondOpponentId, setSecondOpponentId] = useState(
    secondOpponentJson ? JSON.parse(secondOpponentJson) : null,
  );
  const [wizzardsData, setWizzardsData] = useState([]);

  useEffect(() => {
    getWizzards()
      .then((res) => setWizzardsData(res));
  }, []);
  function openPopup() {
    setIsOpenPopup(true);
  }

  const toggleSelectionOpponent = (id: string, opponent: string) => {
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
                {wizzardsData.map((wizzard: WizardObject) => (
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
                {wizzardsData.map((wizzard: WizardObject) => (
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
};
export default IndependentSelect;
