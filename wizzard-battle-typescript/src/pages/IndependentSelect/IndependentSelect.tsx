import React, {
  useState, useEffect,
} from 'react';
import classNames from 'classnames';
import styles from './IndependentSelect.module.css';
import Card from '../../components/Card/Card.tsx';
import PopupWithMessage from '../../components/PopupWithMessage/PopupWithMessage.tsx';
import { getWizzards } from '../../services/wizzards.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.tsx';

type Props = {
    isOpenPopup: boolean,
    // eslint-disable-next-line no-unused-vars
    setIsOpenPopup: (arg: boolean) => void
}

type WizardObject = {
    id: string,
    firstName: string,
    lastName: string,
}

const IndependentSelect: React.FC<Props> = ({ setIsOpenPopup, isOpenPopup }) => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [firstOpponent, setFirstOpponent] = useLocalStorage('firstOpponent', null);
  const [secondOpponent, setSecondOpponent] = useLocalStorage('secondOpponent', null);
  const [wizzardsData, setWizzardsData] = useState([]);

  useEffect(() => {
    getWizzards()
      .then((res) => setWizzardsData(res));
  }, []);
  function openPopup() {
    setIsOpenPopup(true);
  }

  const toggleFirstOpponent = (wizardData: WizardObject) => {
    if (firstOpponent !== null && firstOpponent.id === wizardData.id) {
      setFirstOpponent(null);
    } else {
      setFirstOpponent(wizardData);
    }
  };

  const toggleSecondOpponent = (wizardData: WizardObject) => {
    if (secondOpponent !== null && secondOpponent.id === wizardData.id) {
      setSecondOpponent(null);
    } else {
      setSecondOpponent(wizardData);
    }
  };

  useEffect(() => {
    setIsDisableButton(firstOpponent === null || secondOpponent === null);
  }, [firstOpponent, secondOpponent]);
  return (
          <>
            <section className={styles.manual}>
              <div className={styles.manual__box}>
                <div className={styles.manual__container}>
                {wizzardsData.map((wizzard: WizardObject) => (
                    <Card
                      colorPlace={firstOpponent !== null && wizzard.id === firstOpponent.id}
                      toggleSelectionOpponent = {() => toggleFirstOpponent(wizzard)}
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
                      colorPlace={secondOpponent !== null && wizzard.id === secondOpponent.id}
                      toggleSelectionOpponent = {() => toggleSecondOpponent(wizzard)}
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
