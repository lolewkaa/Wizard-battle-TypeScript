import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopupWithWarning.module.css";

export default function PopupWithWarning({ setIsOpenPopupWarning }) {
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
    <>
      <div onClick={removeLocalStorage} className={styles.popup__overlay}></div>
      <div className={styles.popup}>
        <h2 className={styles.popup__text}>
          Are you sure you want to leave the battle page? All changes will be
          deleted.
        </h2>
        <button onClick={removeLocalStorage} className={styles.popup__close}>
          Yes
        </button>
        <button onClick={redirectToTheBattle} className={styles.popup__close}>
          No
        </button>
      </div>
    </>
  );
}
