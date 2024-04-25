import React, {
  useEffect, useState, SetStateAction, Dispatch,
} from "react";
import classNames from 'classnames';
import styles from "./AutoSelect.module.css";
import Card from "../../components/Card/Card.tsx";
import PopupWithMessage from "../../components/PopupWithMessage/PopupWithMessage.tsx";
import { getWizzards } from '../../services/wizzards.tsx';
import { getRandomWizzard } from '../../utils/utils.tsx';
import useLocalStorage from "../../hooks/useLocalStorage.tsx";

type Props = {
    isOpenPopup: boolean,
    setIsOpenPopup: Dispatch<SetStateAction<boolean>>
}

const AutoSelect: React.FC<Props> = ({ isOpenPopup, setIsOpenPopup }) => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [wizzardsData, setWizzardsData] = useState([]);
  const [firstOpponent, setFirstOpponent] = useLocalStorage("firstOpponent", null);
  const [secondOpponent, setSecondOpponent] = useLocalStorage("secondOpponent", null);

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
};

export default AutoSelect;
