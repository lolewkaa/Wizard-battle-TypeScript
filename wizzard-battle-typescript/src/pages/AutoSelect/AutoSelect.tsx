import React, {
  useEffect, useState,
} from "react";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import styles from "./AutoSelect.module.css";
import Card from "../../components/Card/Card.tsx";
// import PopupWithMessage from "../../components/PopupWithMessage/PopupWithMessage.tsx";
import PopupWithRedirect from "../../components/PopupWithRedirect/PopupWithRedirect.tsx";
import { getWizzards } from '../../services/wizzards.tsx';
import { getRandomWizzard } from '../../utils/utils.tsx';
import useLocalStorage from "../../hooks/useLocalStorage.tsx";
import Button from "../../components/ui/Button/Button.tsx";

const AutoSelect: React.FC = () => {
  const [isDisableButton, setIsDisableButton] = useState<boolean>(false);
  const [wizzardsData, setWizzardsData] = useState<Array<number>>([]);
  const [firstOpponent, setFirstOpponent] = useLocalStorage("firstOpponent", null);
  const [secondOpponent, setSecondOpponent] = useLocalStorage("secondOpponent", null);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
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
      setFirstOpponent((getRandomWizzard(wizzardsData)));
      setSecondOpponent(getRandomWizzard(wizzardsData));
      setIsDisableButton(false);
    }, 3000);
  };

  function openPopup() {
    setIsOpenPopup(true);
  }

  const closePopup = () => setIsOpenPopup(false);
  const redirectAfterWin = () => {
    navigate('/battle');
  };
  return (
    <>
      <section className={styles.auto}>
      <div className={styles.auto__box}>
      <Card
        name={firstOpponent?.firstName}
        lastName={firstOpponent?.lastName}
      />
      <div className={styles.auto__container}>
      <Button
          buttonStyle={classNames(styles.auto__button, { [styles.disable]: isDisableButton })}
          clickButton={handleFindFighters}
          disabled={isDisableButton}
          text='Find opponents'
        />
        <Button
          buttonStyle={classNames(styles.auto__button, { [styles.disable]: isDisableButton })}
          clickButton={openPopup}
          disabled={isDisableButton}
          text='Action!'
        />
      </div>
      <Card
        name={secondOpponent?.firstName}
        lastName={secondOpponent?.lastName}
      />
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

export default AutoSelect;
