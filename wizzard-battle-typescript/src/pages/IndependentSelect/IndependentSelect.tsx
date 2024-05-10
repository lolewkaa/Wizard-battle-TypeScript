import React, {
  useState, useEffect,
} from 'react';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import styles from './IndependentSelect.module.css';
import Card from '../../components/Card/Card.tsx';
import PopupWithRedirect from '../../components/PopupWithRedirect/PopupWithRedirect.tsx';
import { getWizzards } from '../../services/wizzards.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.tsx';
import Button from '../../components/ui/Button/Button.tsx';

type WizardObject = {
    id: string,
    firstName: string,
    lastName: string,
}

const IndependentSelect: React.FC = () => {
  const [isDisableButton, setIsDisableButton] = useState<boolean>(false);
  const [firstOpponent, setFirstOpponent] = useLocalStorage('firstOpponent', null);
  const [secondOpponent, setSecondOpponent] = useLocalStorage('secondOpponent', null);
  const [wizzardsData, setWizzardsData] = useState<Array<WizardObject>>([]);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const navigate = useNavigate();

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

  const closePopup = () => setIsOpenPopup(false);
  const redirectAfterWin = () => {
    navigate('/battle');
  };
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
                <Button
                clickButton={openPopup}
                disabled={isDisableButton}
                text={'Action!'}
                buttonStyle={
                  classNames(styles.manual__button, { [styles.disable]: isDisableButton })
                }
                />
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
            {isOpenPopup && (
        <PopupWithRedirect
          onClose={closePopup}
          onRedirect={redirectAfterWin}
          message="Redirect to the battle page"
        />
            )}
          </>
  );
};
export default IndependentSelect;
