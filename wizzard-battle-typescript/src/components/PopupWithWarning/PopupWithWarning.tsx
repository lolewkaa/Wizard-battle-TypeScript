import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopupWithWarning.module.css";
import Popup from "../Popup/Popup.tsx";
import Button from "../ui/Button/Button.tsx";

type PropsPopupWithWarning = {
  // eslint-disable-next-line no-unused-vars
  setIsOpenPopupWarning: (arg: boolean) => void;
  message: string;
};

const PopupWithWarning: React.FC<PropsPopupWithWarning> = ({
  setIsOpenPopupWarning,
  message,
}) => {
  const navigate = useNavigate();
  function removeLocalStorage() {
    localStorage.removeItem("secondOpponentId");
    localStorage.removeItem("firstOpponentId");
    localStorage.removeItem("isBattleStarted");
    setIsOpenPopupWarning(false);
  }

  function redirectToTheBattle() {
    navigate("/battle");
    setIsOpenPopupWarning(false);
  }
  return (
    <Popup onClose={removeLocalStorage}>
      <h2 className={styles.popup__text}>{message}</h2>
      <Button
        clickButton={removeLocalStorage}
        buttonStyle={styles.popup__close}
        text="Yes"
      />
      <Button
        clickButton={redirectToTheBattle}
        buttonStyle={styles.popup__close}
        text="No"
      />
    </Popup>
  );
};

export default PopupWithWarning;
