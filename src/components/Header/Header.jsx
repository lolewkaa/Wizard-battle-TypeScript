import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../Button/Button.jsx";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const feedBackLocation = location.pathname !== "/feedback";
  const step2 = location.pathname === "/manual-selection"
    || location.pathname === "/auto-selection"
    || location.pathname === "/battle";
  const step3 = location.pathname === "/battle";
  const mainPageLocation = location.pathname !== '/';

  function openForm() {
    navigate("/feedback");
  }

  function goHome() {
    navigate("/");
  }
  return (
    <>
      <section className={styles.header}>
        <div className={styles.header__box}>
          <div className={styles.header__container}>
            {feedBackLocation && (
              <>
                <div className={styles.header__step}>
                  <h2 className={styles.header__text}>Step 1</h2>
                </div>
                <h2 className={styles.header__arrow}>⇒</h2>
              </>
            )}
            {step2 && (
              <>
                <div className={styles.header__step}>
                  <h2 className={styles.header__text}>Step 2</h2>
                </div>
                <h2 className={styles.header__arrow}>⇒</h2>
              </>
            )}
            {step3 && (
              <div className={styles.header__step}>
                <h2 className={styles.header__text}>Step 3</h2>
              </div>
            )}
          </div>
          {feedBackLocation && (
            <Button
              buttonStyle={styles.header__feedBack}
              text="Feedback"
              clickButton={openForm}
            />
          )}
          {mainPageLocation && (
            <Button
              buttonStyle={styles.header__feedBack}
              text="Home"
              clickButton={goHome}
            />
          )}
        </div>
      </section>
    </>
  );
}
